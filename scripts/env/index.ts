// Validates the repository-root .env before anything starts.
//
// Usage: vpx scripts/env/index.ts <group> [<group> ...]
//
// This is the only place environment variables are validated; the rules live in
// ./schema.ts. Root scripts (dev, preview, build, docker:up, db:*) run it first and
// chain the real command with `&&`, so an invalid value stops everything before any
// server or tool boots.

import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { z } from 'zod';
import { groups, type GroupName } from './schema.ts';

const ROOT_ENV_FILE = fileURLToPath(new URL('../../.env', import.meta.url));

// Report a usage mistake or an invalid environment, then stop with a failing exit
// code. A failing code is what makes `&&` skip the command that follows.
function fail(message: string): never {
  console.error(message);
  process.exit(1);
}

// Accept only known group names, and require at least one.
function parseGroups(args: string[]): GroupName[] {
  const known = Object.keys(groups);
  const unknown = args.filter((arg) => !known.includes(arg));

  if (args.length === 0 || unknown.length > 0) {
    const received = args.length === 0 ? 'none' : unknown.join(', ');
    fail(`Usage: vpx scripts/env/index.ts <group> [<group> ...]\nGroups: ${known.join(', ')}. Received: ${received}.`);
  }

  return args as GroupName[];
}

// Load the root .env into process.env. A missing file is not an error here: values
// can come from the shell, and the validation below reports whatever is missing.
// process.loadEnvFile never overwrites a variable that is already set.
function loadRootEnvFile(): void {
  if (existsSync(ROOT_ENV_FILE)) {
    process.loadEnvFile(ROOT_ENV_FILE);
  }
}

// Merge the selected groups into one schema and validate the process environment.
// A variable shared by two groups (for example DATABASE_URL) is checked once.
function validate(selected: GroupName[]): void {
  const shape = Object.assign({}, ...selected.map((name) => groups[name])) as z.ZodRawShape;
  const result = z.object(shape).safeParse(process.env);

  if (!result.success) {
    fail([`Invalid environment for: ${selected.join(', ')}`, '', z.prettifyError(result.error), '', `Fix the values in ${ROOT_ENV_FILE} (copy .env.example if it is missing). Nothing was started.`].join('\n'));
  }
}

// Entry point: run the steps in order. Each step is described above.
function main(): void {
  const selected = parseGroups(process.argv.slice(2));
  loadRootEnvFile();
  validate(selected);
}

main();
