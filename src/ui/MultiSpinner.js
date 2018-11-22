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

import Visual from './Visual'
import Task from './spinners/Task'
import Spinner from './Spinner'

export default class MultiSpinner extends Visual {
  _spinners = new Map

  addSpinner(name, spinner) {
    this._spinners.set(name, spinner)
  }

  getNextFrame() {
    let finalFrame = ''
    let finalLines = 0

    for (let [, spinner] of this._spinners) {
      let {frame, lines} = spinner.render()
      finalFrame += frame
      finalLines += lines
    }

    return {
      frame: finalFrame,
      lines: finalLines,
    }
  }

  removeSpinner(name) {
    this._spinners.delete(name)
  }

  updateSpinner(name, args) {
    const SPINNER = this._spinners.get(name)
    SPINNER.update(args)
  }
}
