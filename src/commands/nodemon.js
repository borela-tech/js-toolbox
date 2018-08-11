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
import {exitOnError, runCommandSync} from '../system'
import {getPackageDir} from '../paths'

function builder(yargs) {
  appArgs(yargs)
  inspect(yargs)
}

function handler(args) {
  let {appArgs, inspect} = args
  let nodemonArgs = [`"${getPackageDir()}"`]

  // Inspect needs to be passed before the script.
  if (inspect) nodemonArgs.unshift('--inspect')

  // The rest of the app args must be after the script.
  if (appArgs) nodemonArgs.push(appArgs)

  exitOnError(runCommandSync('nodemon', {args: nodemonArgs}))
}

export default {
  command: 'nodemon',
  description: 'Run the project using nodemon.',
  builder,
  handler,
}
