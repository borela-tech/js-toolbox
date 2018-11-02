// Licensed under the Apache License, Version 2.0 (the “License”); you may not
// use this file except in compliance with the License. You may obtain a copy of
// the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an “AS IS” BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations under
// the License.

/**
 * Add a single flag to yargs/yargs command.
 */
export function addFlag(yargs, {flag, ...options}) {
  yargs.option(flag, options)
}

/**
 * Adds a list of flags to yargs/yargs command.
 */
export function addFlags(yargs, flags) {
  for (let flag of flags)
    addFlag(yargs, flag)
}

export const APP_ARGS = {
  flag: 'app-args',
  description: 'Arguments to pass to the app.',
  type: 'string',
}

export const BROWSERS = {
  flag: 'browsers',
  description: 'Browsers supported.',
  type: 'array',
}

export const BUNDLE_STATS = {
  flag: 'bundle-stats',
  description: 'Generate a “bundle-stats.json” file.',
  type: 'boolean',
}

export const COMMENT_FLOW = {
  flag: 'comment-flow',
  description: 'Convert Flow annotations to comments.',
  type: 'boolean',
}

export const DEBUG = {
  flag: 'debug',
  description: 'Enable NodeJS inspector.',
  type: 'boolean',
}

export const DISABLE_EXPERIMENTAL_PLUGINS = {
  flag: 'disable-experimental-plugins',
  description: 'Disable Babel’s experimental plugins.',
  type: 'boolean',
}

export const DISABLE_SOURCE_MAPS = {
  flag: 'disable-source-maps',
  description: 'Disable source map generation.',
  type: 'boolean',
}

export const FLOW = {
  flag: 'flow',
  description: 'Enable Flow annotations.',
  type: 'boolean',
}

export const INCLUDE_POLYFILLS = {
  flag: 'include-polyfills',
  description: 'Include the required polyfills.',
  type: 'boolean',
}

export const JSX = {
  flag: 'jsx',
  description: 'Enable JSX.',
  type: 'boolean',
}

export const MINIFY = {
  flag: 'minify',
  description: 'Minify everything.',
  type: 'boolean',
}

export const MINIFY_CSS = {
  flag: 'minify-css',
  description: 'Minify CSS source.',
  type: 'boolean',
}

export const MINIFY_HTML = {
  flag: 'minify-html',
  description: 'Minify HTML source.',
  type: 'boolean',
}

export const MINIFY_JS = {
  flag: 'minify-js',
  description: 'Minify JS source.',
  type: 'boolean',
}

export const NODE = {
  flag: 'node',
  description: 'Minimum NodeJS version supported.',
  type: 'string',
}

export const PORT = {
  flag: 'port',
  description: 'Port used to serve the app.',
  type: 'number',
}

export const PRODUCTION = {
  flag: 'production',
  description: 'Set NODE_ENV to production.',
  type: 'boolean',
}

export const PROGRESS = {
  flag: 'progress',
  description: 'Show progress indicator.',
  type: 'boolean',
}

export const PROJECT_TYPE = {
  flag: 'project-type',
  choices: [
    'cli',
    'lib',
    'node-app',
    'node-lib',
    'react-spa',
    'web-lib',
  ],
  description: 'Project presets.',
  type: 'string',
}

export const REACT = {
  flag: 'react',
  description: 'Enable React transformations.',
  type: 'boolean',
}

export const REMOVE_FLOW = {
  flag: 'remove-flow',
  description: 'Remove Flow annotations.',
  type: 'boolean',
}

export const TYPE_SCRIPT = {
  flag: 'type-script',
  description: 'Enable TypeScript.',
  type: 'boolean',
}

export const WATCH = {
  flag: 'watch',
  description: 'Watch for changes.',
  type: 'boolean',
}
