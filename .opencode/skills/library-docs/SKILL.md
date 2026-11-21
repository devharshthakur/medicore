---
name: library-docs
description: "Use before fetching documentation for any library in this project. Enforces source priority: configured library MCP server, installed library skill, project sitemap, Context7, then web search. Load when a task needs library APIs, configuration, or behavior details."
---

# Library docs

Run this routing check before fetching docs for any library. Do not call Context7, search the web, or open a docs site until the check selects a source.

## Routing protocol

1. **Library MCP server.** If the current session provides an MCP server for the library, use it first. If it cannot answer, use Context7, then web search.
2. **Installed library skill.** If no MCP server is provided for the library, check installed skills. Load the matching skill and follow it. If it answers, stop. If it is insufficient, use Context7, then web search.
3. **Project sitemap.** If no MCP server and no library skill are provided, load the `sitemaps` skill and open the matching reference. Pick the closest page and fetch only that raw URL. If the sitemap lacks the answer, use Context7, then web search.
4. **Context7.** Use the Context7 MCP server only when the selected MCP server, skill, or sitemap is unavailable or insufficient.
5. **Web search.** Use it only when Context7 is also insufficient.

A source is "provided" only when it is configured and available in the current session. An MCP server mentioned inside a skill does not count until it is configured.

## Current sources

| Library | MCP server | Skill | Sitemap | Route |
| --- | --- | --- | --- | --- |
| Nitro | none | none | `sitemaps` skill: Nitro | Sitemap |
| Nuxt | none | `nuxt` | `sitemaps` skill: Nuxt | Skill; sitemap only if skill is unavailable |
| Nuxt UI | not configured | `nuxt-ui` | none | Skill |
| Vue | none | Vue skills | none | Matching skill |
| Drizzle ORM/Kit | `drizzle` | `drizzle` | none | MCP |
| Tailwind CSS | none | none | none | Context7, then web search |
| TanStack Vue Query | none | none | none | Context7, then web search |

## Using a sitemap

1. Load `sitemaps` and open the reference for the library.
2. Choose the closest page by section and title.
3. Fetch only that raw URL with `webfetch`. Nitro links return MDX source; Nuxt links return Markdown, though some Nuxt entries are HTML pages and must be fetched as HTML.
4. Cite the page URL when reporting behavior.
5. If the page is missing or insufficient, continue with Context7, then web search.

## Keeping it current

- Nitro tracks the `main` branch. Installed `nitro@3.0.261103-rc` may be behind it.
- Nuxt tracks the current `docs/4.x` branch.
- To add a library, add a reference to the `sitemaps` skill with the same header and group structure, then update its router and add a row above. The sitemap is used only when no MCP server or skill is provided.
