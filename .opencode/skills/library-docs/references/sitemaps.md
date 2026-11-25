# Documentation sitemaps

Use this reference only after the routing protocol in `SKILL.md` selects a sitemap. Goal: find the official page for a library without relying on remembered APIs, for any library, not only Nuxt and Nitro.

## Maintained indexes

Check this folder for a maintained index before searching the web:

- [Nuxt](docs/nuxt.md)
- [Nitro](docs/nitro.md)
- [Vite+](docs/viteplus.md)

1. Choose the closest page by section and title.
2. Fetch only that URL, except when using the full-document option in the Vite+ index. Raw or `.md` links return source; pages without a markdown form must be fetched as HTML.
3. Cite the page URL when reporting behavior.
4. Indexes are snapshots and may be stale. If a link fails or contradicts the installed version, inspect the upstream repository and state the version difference.

## Live sitemaps

When no maintained index exists, discover the documentation site's own sitemap:

1. Check `https://<docs-host>/sitemap.xml`, then `robots.txt` for `Sitemap:` entries, and `/llms.txt` when the site offers it. A sitemap index lists child sitemaps; open only the child that matches the topic.
2. Prefer entries for the installed major version and the requested topic. Skip blog, changelog, and legacy version paths.
3. Fetch the candidate page, preferring raw Markdown or `Accept: text/markdown` when offered, and confirm it covers the needed API.
4. Cite the page URL and note that it came from the site's sitemap.
5. If the site publishes no sitemap, use its search or navigation, but still fetch only the pages needed.

Never invent a path from a guessed URL pattern.

## Fallback

If a maintained or live sitemap is missing, incomplete, or stale, continue the `library-docs` route: Context7, then web search. Do not stop at an unpublished or unusable sitemap.

## Adding a maintained index

Create `docs/<library>.md` with a header naming the upstream repository, tracked branch, raw base URL, and any installed-version caveat. Group links by section and use exact upstream paths. Register the file under "Current sources" in `SKILL.md`; a maintained index is used only when no MCP server or skill is provided.
