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
   * Stores temporarily the log messages to print before the spinner.
   */
  _logMessages = ''

  /**
   * Spinner used to indicate progress.
   */
  _spinner = undefined

  constructor(spinner) {
    this._spinner = spinner
  }

  getFrameEraser() {
    return this._spinner.getFrameEraser()
  }

  write(message) {
    this._logMessages += message
  }

  writeLine(message) {
    this._logMessages += `${message}\n`
  }

  renderLogMessages() {
    if (!this._logMessages)
      return ''

    const RESULT = !this._logMessages.endsWith('\n')
      ? `${this._logMessages}\n`
      : this._logMessages

    this._logMessages = ''
    return RESULT
  }

  renderSpinner() {
    if (!this._spinner)
      return
    let {frame} = this._spinner.render()
    return frame
  }

  start() {
    cursor.hide()

    const TICKER = setInterval(() => {
      const ERASE_FRAME = this.getFrameEraser()
      const LOG_MESSAGES = this.renderLogMessages()
      const SPINNER = this.renderSpinner()
      process.stdout.write(ERASE_FRAME + LOG_MESSAGES + SPINNER)
    }, 1000 / this._fps)

    onExit(() => {
      clearInterval(TICKER)
      process.stdout.write(this.getFrameEraser())
    })
  }
}
