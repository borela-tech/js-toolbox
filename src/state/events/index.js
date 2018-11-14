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
  COMMAND_SET,
  CONFIG_LOADED,
  OPTIONS_SET,
  PROJECT_TYPE_SET,
  TARGET_DIRECTORY_SET,

  TASK_STARTED,
  TASK_STOPPED,
  TASK_UPDATED,
} from './identifiers'

export function configLoaded(options) {
  return {
    type: CONFIG_LOADED,
    payload: {...options},
  }
}

export function commandSet(command) {
  return {
    type: COMMAND_SET,
    payload: command,
  }
}

export function optionsSet(options) {
  return {
    type: OPTIONS_SET,
    payload: {...options},
  }
}

export function projectTypeSet(projectType) {
  return {
    type: PROJECT_TYPE_SET,
    payload: projectType,
  }
}

export function targetDirectorySet(directory) {
  return {
    type: TARGET_DIRECTORY_SET,
    payload: directory,
  }
}

export function taskStarted({name, status}) {
  return {
    type: TASK_STARTED,
    payload: {name, status},
  }
}

export function taskStopped({name}) {
  return {
    type: TASK_STOPPED,
    payload: {name},
  }
}

export function taskUpdated({name, status}) {
  return {
    type: TASK_UPDATED,
    payload: {name, status},
  }
}
