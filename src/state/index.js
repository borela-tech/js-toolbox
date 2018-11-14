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
  createStore as createReduxStore,
  combineReducers,
} from 'redux'

import command from './reducers/command'
import directories from './reducers/directories'
import options from './reducers/options'
import projectType from './reducers/projectType'
import tasks from './reducers/tasks'

export function createStore() {
  const REDUCERS = combineReducers({
    command,
    directories,
    options,
    projectType,
    tasks,
  })
  return createReduxStore(REDUCERS)
}

export default createStore()
