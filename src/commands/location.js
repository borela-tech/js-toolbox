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

import {createStore} from '../state'
import {setUp} from './utils'
import {resolve} from 'path'

function handler(args) {
  const STORE = createStore()
  setUp(STORE, 'location', args)

  let {
    directories: {toolbox},
  } = STORE.getState()

  process.stdout.write(toolbox)
}

export default {
  command: 'location',
  description: 'Print Toolbox’s location.',
  handler,
}
