# Vite+ Docs Sitemap

> Markdown index of the [Vite+](https://viteplus.dev) docs, copied from `https://viteplus.dev/llms.txt` with the site origin added to each link.
> Base: `https://viteplus.dev`
> Links return Markdown; fetch only the page you need. The local copy at `node_modules/vite-plus/docs` matches the installed version and may differ from the live site.

## Full documentation option

For tasks that need broad Vite+ context, you may fetch [the full documentation](https://viteplus.dev/llms-full.txt) instead of individual pages. It is large, and the fetch tool may truncate the content returned to the agent. Check for truncation; use targeted pages when the full content is unavailable or unnecessary. The live documentation may differ from the installed version.

### Introduction

- [Getting Started](https://viteplus.dev/guide.md)
- [Global CLI](https://viteplus.dev/guide/global-cli.md)
- [Project-local CLI](https://viteplus.dev/guide/local-cli.md)
- [Why Vite+?](https://viteplus.dev/guide/why.md)

### Set Up a Project

- [Creating a Project](https://viteplus.dev/guide/create.md)
- [Migrate to Vite+](https://viteplus.dev/guide/migrate.md)
- [Update Vite+](https://viteplus.dev/guide/upgrade-project.md)

#### Migrate to Vite+

- [Migration Rules](https://viteplus.dev/guide/migrate-rules.md)
- [Upgrade to Vitest 5](https://viteplus.dev/guide/vitest-v5.md)

### Project Toolchain

- [Check](https://viteplus.dev/guide/check.md)
- [Test](https://viteplus.dev/guide/test.md)
- [Dev](https://viteplus.dev/guide/dev.md)
- [Build](https://viteplus.dev/guide/build.md)
- [Pack](https://viteplus.dev/guide/pack.md)
- [Run](https://viteplus.dev/guide/run.md)
- [Task Caching](https://viteplus.dev/guide/cache.md)
- [Commit Hooks](https://viteplus.dev/guide/commit-hooks.md)
- [Monorepo](https://viteplus.dev/guide/monorepo.md)

#### Check

- [Lint](https://viteplus.dev/guide/lint.md)
- [Format](https://viteplus.dev/guide/fmt.md)

#### Task Caching

- [Automatic Data Tracking](https://viteplus.dev/guide/automatic-data-tracking.md)
- [GitHub Actions Cache](https://viteplus.dev/guide/github-actions-cache.md)

#### Running Binaries

- [Running Binaries](https://viteplus.dev/guide/vpx.md)
- [vp dlx](https://viteplus.dev/guide/package-management/dlx.md)

### Package Management

- [Package Management](https://viteplus.dev/guide/package-management.md)
- [Package Manager Selection](https://viteplus.dev/guide/package-management/package-manager-selection.md)
- [Global Packages](https://viteplus.dev/guide/package-management/global-packages.md)

#### Core Commands

- [vp install](https://viteplus.dev/guide/package-management/install.md)
- [vp add](https://viteplus.dev/guide/package-management/add.md)
- [vp remove](https://viteplus.dev/guide/package-management/remove.md)
- [vp update](https://viteplus.dev/guide/package-management/update.md)
- [vp dedupe](https://viteplus.dev/guide/package-management/dedupe.md)
- [vp outdated](https://viteplus.dev/guide/package-management/outdated.md)
- [vp list](https://viteplus.dev/guide/package-management/list.md)
- [vp why](https://viteplus.dev/guide/package-management/why.md)
- [vp info](https://viteplus.dev/guide/package-management/info.md)
- [vp link](https://viteplus.dev/guide/package-management/link.md)
- [vp unlink](https://viteplus.dev/guide/package-management/unlink.md)
- [vp rebuild](https://viteplus.dev/guide/package-management/rebuild.md)

#### Forwarded Commands

##### Install and Cleanup

- [vp pm ci](https://viteplus.dev/guide/package-management/ci.md)
- [vp pm prune](https://viteplus.dev/guide/package-management/prune.md)

##### Inspection and Diagnostics

- [vp pm licenses](https://viteplus.dev/guide/package-management/licenses.md)
- [vp pm search](https://viteplus.dev/guide/package-management/search.md)
- [vp pm audit](https://viteplus.dev/guide/package-management/audit.md)
- [vp pm fund](https://viteplus.dev/guide/package-management/fund.md)
- [vp pm ping](https://viteplus.dev/guide/package-management/ping.md)

##### Local Development

- [vp pm approve-builds](https://viteplus.dev/guide/package-management/approve-builds.md)
- [vp pm patch](https://viteplus.dev/guide/package-management/patch.md)
- [vp pm patch-commit](https://viteplus.dev/guide/package-management/patch-commit.md)

##### Publishing

- [vp pm pack](https://viteplus.dev/guide/package-management/pack.md)
- [vp pm version](https://viteplus.dev/guide/package-management/version.md)
- [vp pm publish](https://viteplus.dev/guide/package-management/publish.md)
- [vp pm stage](https://viteplus.dev/guide/package-management/stage.md)
- [vp pm dist-tag](https://viteplus.dev/guide/package-management/dist-tag.md)
- [vp pm deprecate](https://viteplus.dev/guide/package-management/deprecate.md)

##### Registry and Accounts

- [vp pm login](https://viteplus.dev/guide/package-management/login.md)
- [vp pm logout](https://viteplus.dev/guide/package-management/logout.md)
- [vp pm whoami](https://viteplus.dev/guide/package-management/whoami.md)
- [vp pm token](https://viteplus.dev/guide/package-management/token.md)
- [vp pm owner](https://viteplus.dev/guide/package-management/owner.md)
- [vp pm team](https://viteplus.dev/guide/package-management/team.md)

##### Configuration and Maintenance

- [vp pm config](https://viteplus.dev/guide/package-management/config.md)
- [vp pm pkg](https://viteplus.dev/guide/package-management/pkg.md)
- [vp pm cache](https://viteplus.dev/guide/package-management/cache.md)

### Global CLI

- [Homebrew tap](https://viteplus.dev/guide/homebrew.md)
- [Environment](https://viteplus.dev/guide/env.md)
- [Upgrading Vite+](https://viteplus.dev/guide/upgrade.md)
- [Removing Vite+](https://viteplus.dev/guide/implode.md)

### Workflow

- [IDE Integration](https://viteplus.dev/guide/ide-integration.md)
- [Continuous Integration](https://viteplus.dev/guide/ci.md)
- [Docker](https://viteplus.dev/guide/docker.md)

### Reference

- [Troubleshooting](https://viteplus.dev/guide/troubleshooting.md)

### Configuration

- [Configuring Vite+](https://viteplus.dev/config.md)
- [Create Config](https://viteplus.dev/config/create.md)
- [Run Config](https://viteplus.dev/config/run.md)
- [Format Config](https://viteplus.dev/config/fmt.md)
- [Lint Config](https://viteplus.dev/config/lint.md)
- [Check Config](https://viteplus.dev/config/check.md)
- [Test Config](https://viteplus.dev/config/test.md)
- [Build Config](https://viteplus.dev/config/build.md)
- [Pack Config](https://viteplus.dev/config/pack.md)
- [Staged Config](https://viteplus.dev/config/staged.md)
