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

import {eraseLines} from 'ansi-escapes'

export default class Visual {
  /**
   * Maximum frames per second of the element.
   */
  _fps = 15

  /**
   * Current rendered frame.
   */
  _frame = ''

  /**
   * Number of lines used to render the frame.
   */
  _frameLines = 0

  /**
   * Time that the current frame was rendered.
   */
  _frameTime = new Date

  /**
   * Generate the necessary escape characters to erase the frame lines.
   */
  getFrameEraser() {
    return eraseLines(this._frameLines)
  }

  /**
   * The visual element must generate the new frame on this method by overriding
   * it. Each new frame must return the frame itself and the amount of lines it
   * uses.
   */
  getNextFrame() {
    return {
      frame: '',
      lines: 0,
    }
  }

  /**
   * Allow subclasses to process the current frame before rendering.
   */
  postProcess(args) {
    return args
  }

  /**
   * Render the current frame of the element.
   */
  render() {
    const CURRENT_TIME = new Date
    const FPS_WINDOW = 1000 / this._fps

    if (CURRENT_TIME - this._frameTime > FPS_WINDOW) {
      let {frame, lines} = this.postProcess(this.getNextFrame())
      this._frame = frame
      this._frameTime = CURRENT_TIME
      this._frameLines = lines
    }

    return {
      frame: this._frame,
      lines: this._frameLines,
    }
  }
}
