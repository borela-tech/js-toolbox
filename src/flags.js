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

export function browsers(yargs) {
  yargs.option('browsers', {
    description: 'Browsers supported by the project.',
    default: ['chrome >= 49', '>= 0.5%', 'last 2 versions', 'not dead'],
    type: 'array',
  })
}

export function commentFlow(yargs) {
  yargs.option('comment-flow', {
    description: 'Convert Flow annotations to comments.',
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

export function jsx(yargs) {
  yargs.option('jsx', {
    description: 'Enable JSX.',
    type: 'boolean',
  })
    .alias('j', 'jsx')
}

export function node(yargs) {
  yargs.option('node', {
    description: 'Minimum NodeJS version supported by the project.',
    default: '8.5.0',
    type: 'string',
  })
}

export function platforms(yargs) {
  yargs.option('platforms', {
    choices: ['browser', 'electron', 'node'],
    description: 'Used to determine the polyfills and fine tune the linter.',
    default: ['browser', 'node'],
    type: 'array',
  })
}

export function production(yargs) {
  yargs.option('production', {
    description: 'Remove debug plugins.',
    type: 'boolean',
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
