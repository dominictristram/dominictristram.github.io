# Site editing requirements

The site must work when `index.html` is opened directly from the local filesystem (`file://`), as well as when served on the public website. Preserve this for every future change.

- Use document-relative URLs for internal navigation, images, stylesheets, and scripts.
- Link explicitly to `index.html` for directories and to `.html` files for pages. Avoid root-relative paths, empty home links and extensionless internal page URLs.
- Keep canonical URLs and social-sharing URL metadata pointed at the public website. External services and external links remain HTTPS URLs.
- Run `python3 scripts/fix-local-links.py` after editing generated HTML, then verify links from the homepage and a nested article. The script is safe to rerun and preserves historical file encodings.
- Local preview must not require deployment or a local HTTP server. Internet access is still needed for the site's existing externally hosted libraries, fonts, embeds and services.

## Shared site content

- Edit the common menu in `assets/includes/nav.js`, and the footer in `assets/includes/footer.js`. Pages load these classic scripts with document-relative paths; each include resolves its internal URLs from the script location. Do not copy their markup into every page.
- Keep the old `politics/index.html` URL as a small redirect to the primary homepage rather than a duplicate post listing.
- Shared navigation requires JavaScript, as do the existing menu interactions. Keep article content and page metadata in HTML.

- The site has no built-in search. Do not add search controls, indexes or supporting code.

- Shared dependency versions and menu behaviour live in `assets/js/site.js`; all themed pages include it once with `defer`. Keep dependency execution ordered (jQuery, Popper, Bootstrap) while allowing parallel downloads.
- Analytics setup lives in `assets/js/analytics.js` and skips `file://` previews.
- Local theme and social-button styles are combined in `assets/css/beautifuljekyll.css`. Keep external CSS links directly in the head for reliable first rendering; do not insert stylesheets after the page loads.
- Comments use `assets/js/comments.js` and load near the comments section. Keep their public canonical URL stable so all views use the same discussion.
