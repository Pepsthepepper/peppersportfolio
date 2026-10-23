# Pepper’s portfolio

This is a static portfolio published to GitHub Pages from the `site/` directory.

The Pages workflow deploys on pushes to `main`, refreshes profile statistics hourly, and can also be started manually from the Actions tab. It reads the public YT Jobs profile API during deployment and publishes a small `stats.json` file; the page loads that same-origin file because YT Jobs does not allow browser requests from GitHub Pages. If a scheduled refresh fails, the last successful deployment remains online. In repository settings, set **Settings → Pages → Build and deployment → Source** to **GitHub Actions** if it is not already selected.

The work section uses poster previews for the seven original YouTube videos and loads YouTube’s privacy-enhanced player when a visitor activates one. The portfolio avatar is stored locally in `site/assets/` so the hero image does not depend on the Framer site remaining online.
