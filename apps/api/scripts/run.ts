/**
 * Starts the API server in one of three modes:
 *
 *   dev      Nitro development server (hot reload) on API_PORT.
 *   preview  Nitro preview server, serving the last build, on API_PORT.
 *   start    Runs the built bundle at .output/server/index.mjs on API_PORT.
 *
 * Usage: tsx scripts/run.ts <dev|preview|start>
 *
 * Why this launcher exists instead of calling Nitro directly:
 *   1. It loads the repository-root .env, so the API sees the same settings as
 *      Drizzle Kit and the web app, with one file to maintain.
 *   2. It validates API_PORT before the server starts, so a typo fails fast
 *      with a clear message.
 *   3. It forwards Ctrl-C and SIGTERM to the server and passes the server's exit
 *      code back, so the process manager sees the real result.
 */
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

type Mode = 'dev' | 'preview' | 'start';

// The minimal shape of a package.json that we read to find the Nitro CLI.
interface PackageManifest {
  bin?: string | Record<string, string>;
}

// A fully resolved child process: what to run and which extra variables to set.
interface ServerCommand {
  executable: string;
  args: string[];
  extraEnv: Record<string, string>;
}

const DEFAULT_API_PORT = 8000;

// Paths are derived from this file's location, so the launcher works no matter
// which directory the command was started from.
const API_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ROOT_ENV_FILE = join(API_ROOT, '..', '..', '.env');
const BUILT_ENTRY = join(API_ROOT, '.output', 'server', 'index.mjs');

// Accept only the three supported modes. Anything else is a typo or a missing
// argument, so stop before starting a server.
function parseMode(value: string | undefined): Mode {
  if (value === 'dev' || value === 'preview' || value === 'start') {
    return value;
  }
  throw new Error(`Unknown mode "${value}". Expected "dev", "preview", or "start".`);
}

// Load the repository-root .env into process.env. A missing file is not an error,
// so variables set directly in the shell work without it.
//
// process.loadEnvFile never overwrites a variable that is already set. So a shell
// export such as `API_PORT=9000 vp run dev` still wins over the file.
function loadRootEnvFile(): void {
  if (existsSync(ROOT_ENV_FILE)) {
    process.loadEnvFile(ROOT_ENV_FILE);
  }
}

// Read API_PORT after the file is loaded, and reject anything that is not a
// valid TCP port number. Number('') and Number('abc') both fail the check below.
function readApiPort(): number {
  const raw = process.env.API_PORT ?? String(DEFAULT_API_PORT);
  const port = Number(raw);

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error(`API_PORT must be an integer between 1 and 65535; received "${raw}".`);
  }

  return port;
}

// Decide which process to start for the selected mode.
function buildCommand(mode: Mode, port: number): ServerCommand {
  if (mode === 'start') {
    return buildStartCommand(port);
  }

  // dev and preview hand the port to the Nitro CLI, which has the same mode names.
  return {
    executable: process.execPath,
    args: [resolveNitroCli(), mode, '--port', String(port)],
    extraEnv: {},
  };
}

// `start` runs the bundle that `build` already produced. It never rebuilds, so a
// missing bundle is reported with the command that creates it.
function buildStartCommand(port: number): ServerCommand {
  if (!existsSync(BUILT_ENTRY)) {
    console.error(`Built server not found at ${BUILT_ENTRY}. Run "pnpm --filter @medcore/api build" first.`);
    process.exit(1);
  }

  // The built server reads its port from these variables, not from a CLI flag.
  // Both are set, as the previous launcher did.
  return {
    executable: process.execPath,
    args: [BUILT_ENTRY],
    extraEnv: { PORT: String(port), NITRO_PORT: String(port) },
  };
}

// Find the Nitro CLI through this package's own dependencies. That way the
// launcher uses the Nitro version pinned in apps/api/package.json, not a global
// install. Nitro's package.json points to the CLI script under "bin".
function resolveNitroCli(): string {
  const require = createRequire(join(API_ROOT, 'package.json'));
  const packagePath = require.resolve('nitro/package.json');
  const manifest = require(packagePath) as PackageManifest;
  const bin = typeof manifest.bin === 'string' ? manifest.bin : manifest.bin?.nitro;

  if (bin === undefined) {
    throw new Error(`Could not resolve the Nitro CLI from ${packagePath}.`);
  }

  return join(dirname(packagePath), bin);
}

// Start the server as a child process with inherited stdio, so its logs appear
// in this terminal. Then wire up signals and exit codes.
function runServer(command: ServerCommand): void {
  const child = spawn(command.executable, command.args, {
    cwd: API_ROOT,
    env: { ...process.env, ...command.extraEnv },
    stdio: 'inherit',
  });

  // Ctrl-C and SIGTERM go to the server, which then shuts down its own way.
  // This launcher does not exit on its own; it waits for the child to exit.
  for (const signal of ['SIGINT', 'SIGTERM'] as const) {
    process.once(signal, () => child.kill(signal));
  }

  child.on('error', (error) => {
    console.error(error.message);
    process.exit(1);
  });

  // Mirror the child's exit code. If the child was killed by a signal, `code` is
  // null, and that is reported as a failure.
  child.on('exit', (code) => {
    process.exit(code ?? 1);
  });
}

// Entry point: run the steps in order. Each step is described above.
function main(): void {
  const mode = parseMode(process.argv[2]);
  loadRootEnvFile();
  const port = readApiPort();
  const command = buildCommand(mode, port);
  runServer(command);
}

main();
