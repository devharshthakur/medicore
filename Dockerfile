FROM ghcr.io/voidzero-dev/vite-plus:1.7.0 AS build
RUN sudo mkdir -p /app && sudo chown vp:vp /app
WORKDIR /app
COPY --chown=vp:vp . .
ENV CI=true
RUN vp node -e "const fs = require('node:fs'); const p = require('./package.json'); delete p.scripts.prepare; fs.writeFileSync('package.json', JSON.stringify(p, null, 2));"
RUN vp install --frozen-lockfile
RUN vp exec turbo run build --filter=@medcore/web --filter=@medcore/api

FROM build AS migrate
WORKDIR /app/packages/db
CMD ["vp", "run", "db:migrate"]

FROM node:26.13.1-bookworm-slim AS web
WORKDIR /app
ENV NODE_ENV=production NITRO_HOST=0.0.0.0 NITRO_PORT=3000
COPY --from=build --chown=node:node /app/apps/web/.output ./.output
USER node
CMD ["node", ".output/server/index.mjs"]

FROM node:26.13.1-bookworm-slim AS api
WORKDIR /app
ENV NODE_ENV=production NITRO_HOST=0.0.0.0 NITRO_PORT=8000
COPY --from=build --chown=node:node /app/apps/api/.output ./.output
USER node
CMD ["node", ".output/server/index.mjs"]
