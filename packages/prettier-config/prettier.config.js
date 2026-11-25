/**
 * Shared Prettier defaults for every workspace package. Individual packages
 * import this config and add their own overrides.
 *
 * @typedef {import('prettier').Config} PrettierConfig
 */

/** @type {PrettierConfig} */
const config = {
  printWidth: 400,
  singleQuote: true,
};

export default config;
