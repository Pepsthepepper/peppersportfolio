import { writeFile } from "node:fs/promises";

const profileId = "479496";
const endpoint = `https://app.ytjobs.co/api/talents/${profileId}`;
const response = await fetch(endpoint, {
  headers: { accept: "application/json" },
  signal: AbortSignal.timeout(20_000),
});

if (!response.ok) {
  throw new Error(`YT Jobs returned HTTP ${response.status}`);
}

const profile = await response.json();
const stats = profile?.youtubeVideos?.statistics;

if (
  profile?.talent?.id !== profileId ||
  !Number.isSafeInteger(stats?.counts) ||
  stats.counts < 0 ||
  typeof stats.abvViews !== "string" ||
  !stats.abvViews.trim() ||
  typeof stats.abvLikes !== "string" ||
  !stats.abvLikes.trim()
) {
  throw new Error("YT Jobs profile response did not contain valid video statistics");
}

const snapshot = {
  videos: String(stats.counts),
  views: stats.abvViews,
  likes: stats.abvLikes,
  updatedAt: new Date().toISOString(),
  source: `https://ytjobs.co/talent/profile/${profileId}?r=912`,
};

await writeFile(
  new URL("../site/stats.json", import.meta.url),
  `${JSON.stringify(snapshot, null, 2)}\n`,
);

console.log(`Updated YT Jobs stats: ${snapshot.videos} videos, ${snapshot.views} views, ${snapshot.likes} likes`);
