# MedCore HMS

> [!IMPORTANT]
> Under active development. The project is currently a scaffold; product features are not yet complete.

MedCore HMS is a multi-tenant hospital management platform for clinical and administrative workflows.

## Tech stack

| Area           | Technology                         |
| -------------- | ---------------------------------- |
| Web            | Nuxt, Vue, Nuxt UI, Tailwind CSS   |
| API            | Nitro                              |
| Database       | PostgreSQL, Drizzle ORM            |
| Data fetching  | TanStack Vue Query                 |
| Authentication | Better Auth                        |
| Tooling        | TypeScript, Vite+, Turborepo, pnpm |

## Documentation

| Guide                                      | Description                               |
| ------------------------------------------ | ----------------------------------------- |
| [Local setup](docs/setup.md)               | Run the apps and database for development |
| [Self-hosting with Docker](docs/docker.md) | Run the production-mode stack             |
| [Scripts](scripts/README.md)               | Root tooling and environment validation   |
| [Web app](apps/web/README.md)              | Nuxt client                               |
| [API](apps/api/README.md)                  | Nitro server                              |
| [Shared](apps/shared/README.md)            | Code shared across apps                   |
| [Database](packages/db/README.md)          | Schema, migrations, and local PostgreSQL  |

## Project structure

```text
medcore/
├── apps/
│   ├── api/                 # Nitro API server
│   ├── shared/              # Code shared across apps
│   └── web/                 # Nuxt web app
├── docs/                    # Setup and self-hosting guides
├── packages/
│   └── db/                  # Drizzle schema, client, and migrations
├── prd/                     # Product requirements
├── scripts/                 # Root tooling and environment validation
├── .env.example
├── compose.yaml
├── Dockerfile
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
└── vite.config.ts
```

## License

Released under the [MIT License](LICENSE).
