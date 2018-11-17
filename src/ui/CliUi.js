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
import Spinner from './Spinner'
import {eraseLines} from 'ansi-escapes'

export default class CliUi {
  fps = 30
  spinners = new Map
  lastFrameLines = 0

  addSpinner({name, status}) {
    this.spinners.set(name, new Spinner(status))
  }

  renderFrame() {
    if (process.stdout.isTTY)
      this.renderSpinners()
  }

  renderSpinners() {
    // Prepare the escapes to clear the last frame.
    const CLEAR_LINES = eraseLines(this.lastFrameLines)

    // Prepare the new frame.
    let newFrame = ''

    for (const [, SPINNER] of this.spinners) {
      if (newFrame === '')
        newFrame = SPINNER.tick()
      else
        newFrame += '\n' + SPINNER.tick()
    }

    this.lastFrameLines = this.spinners.size

    // Clear the last frame and render the new one.
    process.stdout.write(`${CLEAR_LINES}${newFrame}`)
  }

  start() {
    cursor.hide()

    this.renderFrame()

    const TICKER = setInterval(() => {
      this.renderFrame()
    }, 1000 / this.fps)

    onExit(() => {
      clearInterval(TICKER)
      process.stdout.write(eraseLines(this.lastFrameLines))
    })
  }

  removeSpinner({name}) {
    this.spinners.delete(name)
  }

  updateSpinner({name, status}) {
    const SPINNER = this.spinners.get(name)
    SPINNER.status = status
  }
}
