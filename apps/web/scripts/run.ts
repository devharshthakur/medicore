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
  dev: { command: 'dev', portKey: 'WEB_DEV_PORT', fallbackPort: 5173 },
  preview: { command: 'preview', portKey: 'WEB_PREVIEW_PORT', fallbackPort: 4173 },
} as const;
type Mode = keyof typeof modes;

const mode = process.argv[2];

function isMode(value: string | undefined): value is Mode {
  return value !== undefined && Object.hasOwn(modes, value);
}

if (!isMode(mode)) {
  throw new Error(`Unknown mode "${mode}". Expected "dev" or "preview".`);
}

const selected = modes[mode];

const envFile = join(appRoot, '.env');
if (existsSync(envFile)) {
  process.loadEnvFile(envFile);
}

const rawPort = process.env[selected.portKey] ?? String(selected.fallbackPort);
const port = Number(rawPort);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error(`${selected.portKey} must be an integer between 1 and 65535; received "${rawPort}".`);
}

const require = createRequire(join(appRoot, 'package.json'));
const nuxtPackagePath = require.resolve('nuxt/package.json');
const nuxtPackage = require(nuxtPackagePath) as PackageManifest;
const nuxtBin = typeof nuxtPackage.bin === 'string' ? nuxtPackage.bin : nuxtPackage.bin?.nuxt;
if (nuxtBin === undefined) {
  throw new Error(`Could not resolve the Nuxt CLI from ${nuxtPackagePath}.`);
}
const nuxtCli = join(dirname(nuxtPackagePath), nuxtBin);

const child = spawn(process.execPath, [nuxtCli, selected.command, '--port', String(port), '--strictPort'], {
  cwd: appRoot,
  env: process.env,
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
