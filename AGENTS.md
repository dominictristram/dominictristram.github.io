# Site editing requirements

The site must work when `index.html` is opened directly from the local filesystem (`file://`), as well as when served on the public website. Preserve this for every future change.

- Use document-relative URLs for internal navigation, images, stylesheets, scripts and search results.
- Link explicitly to `index.html` for directories and to `.html` files for pages. Avoid root-relative paths, empty home links and extensionless internal page URLs.
- Keep canonical URLs and social-sharing URL metadata pointed at the public website. External services and external links remain HTTPS URLs.
- Run `python3 scripts/fix-local-links.py` after editing generated HTML, then verify links from the homepage, About page and a nested article. The script is safe to rerun and preserves historical file encodings.
- Local preview must not require deployment or a local HTTP server. Internet access is still needed for the site's existing externally hosted libraries, fonts, embeds and services.
