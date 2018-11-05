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

import {COMMAND_SET} from '../events/identifiers'

export default function (state = null, event) {
  let {payload, type} = event

  switch (type) {
    case COMMAND_SET:
      let {command} = payload
      return command || state
  }

  return state
}
