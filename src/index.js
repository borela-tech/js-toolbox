#!/usr/bin/env node

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

import packageInfo from '../package'
import Yargs from 'yargs'
import {build, lint, scaffold, test} from './commands'
import {CTRINE} from './banner'

Yargs.usage(CTRINE)
  .command(build)
  .command(scaffold)
  .command(lint)
  .command(test)
  .demandCommand(1, 'Error: Use one of the commands available.')
  .recommendCommands()
  .strict()
  // Custom help and version messages.
  .help('help', 'Show usage instructions.')
  .version('version', 'Show toolbox version.', packageInfo.version)
  // Build and linting options.
  .option('comment-flow', {
    description: 'Convert Flow annotations to comments.',
    type: 'boolean',
  })
  .option('env', {
    choices: ['browser', 'node-js'],
    description: 'Used to determine the polyfills and fine tune the linter.',
    default: ['browser', 'node-js'],
    type: 'array',
  })
  .option('flow', {
    description: 'Enable Flow annotations.',
    type: 'boolean',
  })
  .option('jsx', {
    description: 'Enable JSX.',
    type: 'boolean',
  })
  .option('react', {
    description: 'Enable React transformations.',
    type: 'boolean',
  })
  .option('remove-flow', {
    description: 'Remove Flow annotations.',
    type: 'boolean',
  })
  .option('production', {
    description: 'Remove debug plugins.',
    type: 'boolean',
  })
  .option('target-browser', {
    description: 'Browsers targeted by the project.',
    default: ['chrome >= 49', '>= 0.5%', 'last 2 versions', 'not dead'],
    type: 'array',
  })
  .option('target-node-js', {
    description: 'Minimum NodeJS version targeted by the project.',
    default: 6,
    type: 'string',
  })
  .option('type-script', {
    description: 'Enable TypeScript.',
    type: 'boolean',
  })
  .parse()
