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

export function appArgs(yargs) {
  yargs.option('app-args', {
    description: 'Arguments passed to the app.',
    type: 'string',
  })
}

export function browsers(yargs) {
  yargs.option('browsers', {
    description: 'Browsers supported.',
    type: 'array',
  })
}

export function bundleStats(yargs) {
  yargs.option('bundle-stats', {
    description: 'Generate a “bundle-stats.json” file.',
    type: 'boolean',
  })
}

export function commentFlow(yargs) {
  yargs.option('comment-flow', {
    description: 'Convert Flow annotations to comments.',
    type: 'boolean',
  })
}

export function disableExperimentalPlugins(yargs) {
  yargs.option('disable-experimental-plugins', {
    description: 'Disable Babel’s experimental plugins.',
    type: 'boolean',
  })
}

export function disableSourceMaps(yargs) {
  yargs.option('disable-source-maps', {
    description: 'Disable source map generation.',
    type: 'boolean',
  })
}

export function flow(yargs) {
  yargs.option('flow', {
    description: 'Enable Flow annotations.',
    type: 'boolean',
  })
}

export function inspect(yargs) {
  yargs.option('inspect', {
    description: 'Enable NodeJS inspector.',
    type: 'boolean',
  })
}

export function jsx(yargs) {
  yargs.option('jsx', {
    description: 'Enable JSX.',
    type: 'boolean',
  })
}

export function interactiveBundleStats(yargs) {
  yargs.option('interactive-bundle-stats', {
    description: 'Generate an interactive tree map of the bundle.',
    type: 'boolean',
  })
}

export function minify(yargs) {
  yargs.option('minify', {
    description: 'Minify source.',
    type: 'boolean',
  })
}

export function minifyCss(yargs) {
  yargs.option('minify-css', {
    description: 'Minify CSS source.',
    type: 'boolean',
  })
}

export function minifyHtml(yargs) {
  yargs.option('minify-html', {
    description: 'Minify HTML source.',
    type: 'boolean',
  })
}

export function minifyJs(yargs) {
  yargs.option('minify-js', {
    description: 'Minify JS source.',
    type: 'boolean',
  })
}

export function multiEntry(yargs) {
  yargs.option('multi-entry', {
    description: 'Enable default multi entries.',
    type: 'boolean',
  })
}

export function node(yargs) {
  yargs.option('node', {
    description: 'Minimum NodeJS version supported.',
    type: 'string',
  })
}

export function platforms(yargs) {
  yargs.option('platforms', {
    choices: ['browser', 'node'],
    description: 'Fine tune polyfills and linter.',
    type: 'array',
  })
}

export function port(yargs) {
  yargs.option('port', {
    description: 'Port used to serve the app.',
    type: 'number',
  })
}

export function production(yargs) {
  yargs.option('production', {
    description: 'Set NODE_ENV to production.',
    type: 'boolean',
  })
}

export function projectType(yargs) {
  yargs.option('project-type', {
    choices: [
      'cli',
      'lib',
      'node-app',
      'node-lib',
      'react',
      'web-lib',
    ],
    description: 'Affects the build output.',
    type: 'string',
  })
}

export function react(yargs) {
  yargs.option('react', {
    description: 'Enable React transformations.',
    type: 'boolean',
  })
}

export function removeFlow(yargs) {
  yargs.option('remove-flow', {
    description: 'Remove Flow annotations.',
    type: 'boolean',
  })
}

export function typeScript(yargs) {
  yargs.option('type-script', {
    description: 'Enable TypeScript.',
    type: 'boolean',
  })
}

export function watch(yargs) {
  yargs.options({
    watch: {
      default: false,
      description: 'Watch for changes.',
      type: 'boolean',
    },
  })
}
