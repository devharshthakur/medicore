import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

interface PackageManifest {
  bin?: string | Record<string, string>;
}

const appRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const modes = {
  dev: { command: 'dev' },
  preview: { command: 'preview' },
  start: { command: 'start' },
} as const;
type Mode = keyof typeof modes;

const mode = process.argv[2];

function isMode(value: string | undefined): value is Mode {
  return value !== undefined && Object.hasOwn(modes, value);
}

if (!isMode(mode)) {
  throw new Error(`Unknown mode "${mode}". Expected "dev", "preview", or "start".`);
}

const selected = modes[mode];

const envFile = join(appRoot, '.env');
if (existsSync(envFile)) {
  process.loadEnvFile(envFile);
}

const rawPort = process.env.API_PORT ?? '8000';
const port = Number(rawPort);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error(`API_PORT must be an integer between 1 and 65535; received "${rawPort}".`);
}

let executable: string;
let args: string[];
const env: NodeJS.ProcessEnv = { ...process.env };

if (selected.command === 'start') {
  const entry = join(appRoot, '.output/server/index.mjs');
  if (!existsSync(entry)) {
    console.error(`Built server not found at ${entry}. Run "pnpm --filter @medcore/api build" first.`);
    process.exit(1);
  }
  executable = process.execPath;
  args = [entry];
  env.PORT = String(port);
  env.NITRO_PORT = String(port);
} else {
  const require = createRequire(join(appRoot, 'package.json'));
  const nitroPackagePath = require.resolve('nitro/package.json');
  const nitroPackage = require(nitroPackagePath) as PackageManifest;
  const nitroBin = typeof nitroPackage.bin === 'string' ? nitroPackage.bin : nitroPackage.bin?.nitro;
  if (nitroBin === undefined) {
    throw new Error(`Could not resolve the Nitro CLI from ${nitroPackagePath}.`);
  }
  const nitroCli = join(dirname(nitroPackagePath), nitroBin);
  executable = process.execPath;
  args = [nitroCli, selected.command, '--port', String(port)];
}

const child = spawn(executable, args, {
  cwd: appRoot,
  env,
  stdio: 'inherit',
});

for (const signal of ['SIGINT', 'SIGTERM'] as const) {
  process.once(signal, () => child.kill(signal));
}

child.on('error', (error) => {
  console.error(error.message);
  process.exit(1);
});

child.on('exit', (code) => {
  process.exit(code ?? 1);
});
