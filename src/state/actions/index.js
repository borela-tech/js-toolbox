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
  SET_COMMAND,
  SET_OPTIONS,
  SET_PROJECT_TYPE,
  SET_TARGET_DIRECTORY,
} from './identifiers'

export function setCommand(command) {
  return {
    type: SET_COMMAND,
    payload: {command},
  }
}

export function setOptions(options) {
  return {
    type: SET_OPTIONS,
    payload: {...options},
  }
}

export function setTargetDirectory(directory) {
  return {
    type: SET_TARGET_DIRECTORY,
    payload: {directory},
  }
}

export function setProjectType(projectType) {
  return {
    type: SET_PROJECT_TYPE,
    payload: {projectType},
  }
}
