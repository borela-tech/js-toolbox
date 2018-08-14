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
  disableExperimentalPlugins,
  disableSourceMaps,
  jsx,
  minify,
  node,
  platforms,
  react,
  removeFlow,
  typeScript,
  watchBuild,
} from '../flags'
import {CONFIGS_DIR, setTargetDir} from '../paths'
import {getSettings} from '../settings'
import {join} from 'path'
import {exitOnError, runCommandSync} from '../system'
import {exitOnPackageNotFound} from '../util'

const WEBPACK_CONFIG_PATH = join(CONFIGS_DIR, 'webpack')

function builder(yargs) {
  browsers(yargs)
  commentFlow(yargs)
  disableExperimentalPlugins(yargs)
  disableSourceMaps(yargs)
  jsx(yargs)
  minify(yargs)
  node(yargs)
  platforms(yargs)
  react(yargs)
  removeFlow(yargs)
  typeScript(yargs)
  watchBuild(yargs)
}

function handler(args) {
  setTargetDir(args.dir)
  exitOnPackageNotFound()

  exitOnError(runCommandSync('rimraf', {args: ['"build"']}))
  exitOnError(runCommandSync('webpack', {
    args: [`--config "${WEBPACK_CONFIG_PATH}"`],
    env: args,
  }))
}

export default {
  command: 'build [dir]',
  description: 'Build using Webpack.',
  builder,
  handler,
}
