# @medcore/shared

Private TypeScript package for code shared across the MedCore HMS apps. No app imports it yet.

The entry point is `src/index.ts`.

## Scripts

Run from the repository root with `vp run '@medcore/shared#<script>'`.

| Script      | Description                                     |
| ----------- | ----------------------------------------------- |
| `lint`      | Lint with ESLint (`lint:fix` to apply fixes)    |
| `typecheck` | Type-check with `tsc`                           |
| `format`    | Format with Prettier (`format:check` to verify) |

## Project structure

```text
apps/shared/
├── src/
│   └── index.ts
├── eslint.config.mjs
├── package.json
├── prettier.config.js
├── README.md
└── tsconfig.json
```
