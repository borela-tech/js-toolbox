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

import pkgDir from 'pkg-dir'
import {SET_TARGET_DIRECTORY} from '../actions/identifiers'

export default function (state = null, action) {
  let {payload, type} = action

  switch (type) {
    case SET_TARGET_DIRECTORY:
      let {directory} = payload

      if (!directory)
        return state

      return {
        project: pkgDir.sync(target),
        target: directory,
      }
  }

  if (!state) {
    state = {
      project: pkgDir.sync(),
      target: process.cwd(),
    }
  }

  return state
}
