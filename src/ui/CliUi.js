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

export default class CliUi {
  spinners = new Map
  lastFrameLines = 0

  addSpinner({name, status}) {
    this.spinners.set(name, new Spinner(status))
  }

  clearFrame() {
    for (let i = 0; i < this.lastFrameLines; i++) {
      process.stdout.moveCursor(0, -1)
      process.stdout.clearLine()
    }
  }

  renderFrame() {
    if (process.stdout.isTTY)
      this.renderSpinners()
  }

  renderSpinners() {
    cursor.hide()

    for (const [, SPINNER] of this.spinners)
      process.stdout.write(SPINNER.tick() + '\n')

    this.lastFrameLines = this.spinners.size
  }

  start() {
    this.renderFrame()

    const TICKER = setInterval(() => {
      this.clearFrame()
      this.renderFrame()
    }, 1000 / 30)

    onExit(() => {
      clearInterval(TICKER)
      this.clearFrame()
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
