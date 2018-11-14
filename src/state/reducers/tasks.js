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
  TASK_STARTED,
  TASK_STOPPED,
  TASK_UPDATED,
} from '../events/identifiers'

export default function (state = {}, event) {
  let {payload, type} = event

  switch (type) {
    case TASK_STARTED: {
      let {name, status} = payload
      return {
        ...state,
        [name]: status,
      }
    }

    case TASK_STOPPED: {
      let {name} = payload
      let newState = {...state}
      delete newState[name]
      return newState
    }

    case TASK_UPDATED: {
      let {name, status} = payload
      let newState = {...state}
      newState[name] = status
      return newState
    }
  }

  return state
}
