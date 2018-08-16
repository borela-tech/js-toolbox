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

export function disableFlowTyped(yargs) {
  yargs.option('disable-flow-typed', {
    description: 'Disable FlowTyped.',
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
    .alias('f', 'flow')
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
    .alias('j', 'jsx')
}

export function minify(yargs) {
  yargs.option('minify', {
    description: 'Minify source.',
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

export function production(yargs) {
  yargs.option('production', {
    description: 'Set NODE_ENV to production.',
    type: 'boolean',
  })
}

export function projectType(yargs) {
  yargs.option('project-type', {
    choices: ['app', 'library'],
    description: 'Affects the build output.',
    type: 'string',
  })
}

export function react(yargs) {
  yargs.option('react', {
    description: 'Enable React transformations.',
    type: 'boolean',
  })
    .alias('r', 'react')
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
    .alias('t', 'type-script')
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
