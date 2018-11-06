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
import {resolve} from 'path'
import {TARGET_DIRECTORY_SET} from '../events/identifiers'

export default function (state = null, event) {
  let {payload, type} = event

  switch (type) {
    case TARGET_DIRECTORY_SET:
      if (!payload)
        return state

      let directory = resolve(payload)

      return {
        project: pkgDir.sync(directory),
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