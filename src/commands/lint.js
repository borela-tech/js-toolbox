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

import store from '../state'
import {addFlags} from './flags'

import {
  setCommand,
  setOptions,
  setProjectType,
  setTargetDirectory,
} from '../state/actions'

import {
  DISABLE_EXPERIMENTAL_PLUGINS,
  FLOW,
  JSX,
  PROGRESS,
  PROJECT_TYPE,
  REACT,
  TYPE_SCRIPT,
} from './flags'

function builder(yargs) {
  addFlags(yargs, [
    DISABLE_EXPERIMENTAL_PLUGINS,
    FLOW,
    JSX,
    PROGRESS,
    PROJECT_TYPE,
    REACT,
    TYPE_SCRIPT,
  ])
}

function handler(args) {
  let {
    dir,
    projectType,
    ...options,
  } = args

  store.dispatch(setCommand('lint'))
  store.dispatch(setTargetDirectory(dir))
  console.log(store.getState())
}

export default {
  command: 'lint [dir]',
  description: 'Lint using ESLint.',
  builder,
}
