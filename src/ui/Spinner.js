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

import chalk from 'chalk'

export default class Spinner {
  status = '...'
  frame = 0
  frames = [
    '[.  ]',
    '[:. ]',
    '[.:.]',
    '[ .:]',
    '[  .]',
    '[   ]',
  ]

  constructor(status) {
    this.status = status
  }

  tick() {
    this.frame = (this.frame + 1) % this.frames.length

    const SPINNER_FRAME = chalk.bold.yellow(
      this.frames[this.frame]
    )

    return `${SPINNER_FRAME} ${this.status}`
  }
}
