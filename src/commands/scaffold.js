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

import {existsSync} from 'fs'
import {join, resolve} from 'path'
import {TEMPLATES_DIR} from '../paths'

function handler(args) {
  const TEMPLATE = join(TEMPLATES_DIR, args.template)
  if (!existsSync(TEMPLATE)) {
    console.log(`Template “${TEMPLATE}” not found.`)
    return
  }

  const DESTINATION = resolve(args.destination || '')
  console.log('TODO: Implement templates.')
}

export default {
  command: 'scaffold <template> [destination]',
  description: 'Generate a project from the available templates.',
  handler,
}
