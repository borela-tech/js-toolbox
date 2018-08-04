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

import {existsSync, mkdirSync} from 'fs'
import {join, relative, resolve} from 'path'
import {exitOnError, runCommandSync} from '../binaries'
import {TEMPLATES_DIR} from '../paths'

const IS_WINDOWS = process.platform === 'win32'

function copyDirContents(source, destination) {
  if (IS_WINDOWS) {
    // The “echo d |” is used to suppress a prompt to check whether we are
    // copying a file or directory.
    exitOnError(runCommandSync(`echo d | xcopy "${source}" "${destination}" /S`))
  } else
    exitOnError(runCommandSync(`cp -R "${source}" "${destination}"`))
}

function handler(args) {
  const TEMPLATE = join(TEMPLATES_DIR, args.template)
  if (!existsSync(TEMPLATE)) {
    console.log(`Template “${TEMPLATE}” not found.`)
    return
  }

  const DESTINATION = resolve(args.dir || '')
  copyDirContents(TEMPLATE, DESTINATION)
}

export default {
  command: 'scaffold-project <template> [dir]',
  description: 'Generate a project.',
  handler,
}
