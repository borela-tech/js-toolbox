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

import {
  browsers,
  commentFlow,
  jsx,
  node,
  platforms,
  production,
  react,
  removeFlow,
  typeScript,
} from '../flags'
import {CONFIGS_DIR} from '../paths'
import {join} from 'path'
import {exitOnError, runBin} from '../binaries'

const PRESET_LOCATION = join(CONFIGS_DIR, 'babel-preset', 'index.js')
const BABEL_ARGS = [
  'src',
  '-d', 'build',
  '--ignore', '**/__tests__',
  '--source-maps', 'inline',
  `--presets=${PRESET_LOCATION}`,
]

function builder(yargs) {
  browsers(yargs)
  commentFlow(yargs)
  jsx(yargs)
  node(yargs)
  platforms(yargs)
  production(yargs)
  react(yargs)
  removeFlow(yargs)
  typeScript(yargs)
}

function handler(args) {
  let env = args
  exitOnError(runBin('rimraf', ['"build"']))
  exitOnError(runBin('babel', BABEL_ARGS, env))
}

export default {
  command: 'build',
  description: 'Build the project.',
  builder,
  handler,
}
