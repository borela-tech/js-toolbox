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

import {appArgs, inspect} from '../flags'
import {existsSync} from 'fs'
import {exitOnError, runCommandSync} from '../system'
import {exitOnPackageNotFound} from '../utils'
import {getProjectDir, setTargetDir} from '../paths'
import {join} from 'path'

function builder(yargs) {
  appArgs(yargs)
  inspect(yargs)
}

function handler(args) {
  setTargetDir(args.dir)
  exitOnPackageNotFound()

  const DIRECT_MAIN = join(getProjectDir(), 'build', 'main.js')
  const NODE_MAIN = join(getProjectDir(), 'build', 'main.js')
  const MAIN = existsSync(DIRECT_MAIN)
    ? DIRECT_MAIN
    : NODE_MAIN

  let {appArgs, inspect} = args
  let nodemonArgs = [`"${MAIN}"`]

  // Inspect needs to be passed before the script.
  if (inspect)
    nodemonArgs.unshift('--inspect')

  // The rest of the app args must be after the script.
  if (appArgs)
    nodemonArgs.push(appArgs)

  exitOnError(runCommandSync('nodemon', {
    args: nodemonArgs,
    env: {
      borela: 'start',
      ...args,
    },
  }))
}

export default {
  command: 'start [dir]',
  description: 'Start using nodemon.',
  builder,
  handler,
}
