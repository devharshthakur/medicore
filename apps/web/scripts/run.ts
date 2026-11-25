/**
 * Starts the Nuxt web app in one of two modes:
 *
 *   dev      Nuxt development server (hot reload) on WEB_DEV_PORT.
 *   preview  Nuxt preview server, serving the last build, on WEB_PREVIEW_PORT.
 *
 * Usage: tsx scripts/run.ts <dev|preview>
 *
 * Why this launcher exists instead of calling Nuxt directly:
 *   1. It loads the repository-root .env, so the web app reads NUXT_API_ORIGIN
 *      and the ports from the same file as the API.
 *   2. It validates the port before Nuxt starts, so a typo fails fast with a
 *      clear message.
 *   3. It forwards Ctrl-C and SIGTERM to Nuxt and passes its exit code back, so
 *      the process manager sees the real result.
 */
import { spawn } from 'node:child_process'
import { existsSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

type Mode = 'dev' | 'preview'

// Each mode knows its Nuxt subcommand, the .env variable that sets its port, and
// the port to use when that variable is not set.
const MODES = {
  dev: { nuxtCommand: 'dev', portVariable: 'WEB_DEV_PORT', defaultPort: 5173 },
  preview: { nuxtCommand: 'preview', portVariable: 'WEB_PREVIEW_PORT', defaultPort: 4173 }
} as const satisfies Record<Mode, { nuxtCommand: string; portVariable: string; defaultPort: number }>

// The minimal shape of a package.json that we read to find the Nuxt CLI.
interface PackageManifest {
  bin?: string | Record<string, string>
}

// Paths are derived from this file's location, so the launcher works no matter
// which directory the command was started from.
const WEB_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const ROOT_ENV_FILE = join(WEB_ROOT, '..', '..', '.env')

// Accept only the supported modes. Anything else is a typo or a missing argument.
function parseMode(value: string | undefined): Mode {
  if (value === 'dev' || value === 'preview') {
    return value
  }
  throw new Error(`Unknown mode "${value}". Expected "dev" or "preview".`)
}

// Load the repository-root .env into process.env. A missing file is not an error,
// so variables set directly in the shell work without it.
//
// process.loadEnvFile never overwrites a variable that is already set. So a shell
// export such as `WEB_DEV_PORT=3001 vp run dev` still wins over the file.
function loadRootEnvFile(): void {
  if (existsSync(ROOT_ENV_FILE)) {
    process.loadEnvFile(ROOT_ENV_FILE)
  }
}

// Read the port for the selected mode after the file is loaded, and reject
// anything that is not a valid TCP port number.
function readPort(mode: Mode): number {
  const { portVariable, defaultPort } = MODES[mode]
  const raw = process.env[portVariable] ?? String(defaultPort)
  const port = Number(raw)

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error(`${portVariable} must be an integer between 1 and 65535; received "${raw}".`)
  }

  return port
}

// Find the Nuxt CLI through this package's own dependencies. That way the
// launcher uses the Nuxt version pinned in apps/web/package.json, not a global
// install. Nuxt's package.json points to the CLI script under "bin".
function resolveNuxtCli(): string {
  const require = createRequire(join(WEB_ROOT, 'package.json'))
  const packagePath = require.resolve('nuxt/package.json')
  const manifest = require(packagePath) as PackageManifest
  const bin = typeof manifest.bin === 'string' ? manifest.bin : manifest.bin?.nuxt

  if (bin === undefined) {
    throw new Error(`Could not resolve the Nuxt CLI from ${packagePath}.`)
  }

  return join(dirname(packagePath), bin)
}

// Start Nuxt as a child process with inherited stdio, so its logs appear in this
// terminal. Then wire up signals and exit codes.
//
// --strictPort makes Nuxt fail if the port is taken, instead of silently picking
// another one. The URL the user opens then always matches the port in .env.
function runNuxt(nuxtCli: string, nuxtCommand: string, port: number): void {
  const child = spawn(process.execPath, [nuxtCli, nuxtCommand, '--port', String(port), '--strictPort'], {
    cwd: WEB_ROOT,
    env: process.env,
    stdio: 'inherit'
  })

  // Ctrl-C and SIGTERM go to Nuxt, which then shuts down its own way.
  // This launcher does not exit on its own; it waits for the child to exit.
  for (const signal of ['SIGINT', 'SIGTERM'] as const) {
    process.once(signal, () => child.kill(signal))
  }

  child.on('error', (error) => {
    console.error(error.message)
    process.exit(1)
  })

  // Mirror the child's exit code. If the child was killed by a signal, `code` is
  // null, and that is reported as a failure.
  child.on('exit', (code) => {
    process.exit(code ?? 1)
  })
}

// Entry point: run the steps in order. Each step is described above.
function main(): void {
  const mode = parseMode(process.argv[2])
  loadRootEnvFile()
  const port = readPort(mode)
  const nuxtCli = resolveNuxtCli()
  runNuxt(nuxtCli, MODES[mode].nuxtCommand, port)
}

main()
