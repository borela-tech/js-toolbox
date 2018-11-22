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

import cursor from 'cli-cursor'
import onExit from 'signal-exit'

export default class Tty {
  /**
   * Maximum frames per second of the TTY.
   */
  _fps = 15

  /**
   * Spinner used to indicate progress.
   */
  _spinner = undefined

  constructor(spinner) {
    this._spinner = spinner
  }

  renderFrame() {
    let frame = this._spinner.getFrameEraser()

    if (this._spinner) {
      let {frame: spinnerFrame} = this._spinner.render()
      frame += spinnerFrame
    }

    process.stdout.write(frame)
  }

  start() {
    cursor.hide()

    const TICKER = setInterval(() => {
      this.renderFrame()
    }, 1000 / this._fps)

    onExit(() => {
      clearInterval(TICKER)
      // process.stdout.write(eraseLines(this.lastFrameLines))
    })
  }
}
