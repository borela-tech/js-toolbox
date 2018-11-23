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
import {isNumber, isString} from '../utils'

export default class Spinner extends Visual {
  /**
   * Array containing the frames of the animation.
   */
  _animationFrames = undefined

  /**
   * Current frame number.
   */
  _frameIndex = 0

  /**
   * Some spinners shows a progress indication based on the percentage value.
   */
  _percentage = undefined

  /**
   * If supported by the spinner’s animation, it will show a status text too.
   */
  _status = ''

  constructor({percentage, status = ''} = {}) {
    super()
    this._percentage = percentage
    this._status = status
  }

  get percentage() {
    return this._percentage
  }

  set percentage(value) {
    if (!isNumber(value)) {
      if (value === undefined)
        this._percentage = undefined
      return
    }
    this._percentage = value
  }

  get status() {
    return this._status
  }

  set status(value) {
    if (isString(value))
      this._status = value
  }

  /**
   * Render the next frame if there are any in the frames in the animation
   * array.
   */
  getNextFrame() {
    this._frameIndex = this._animationFrames
      ? (this._frameIndex + 1) % this._animationFrames.length
      : -1
    return {
      frame: this._frameIndex >= 0
        ? this._animationFrames[this._frameIndex]
        : '',
      lines: 1,
    }
  }

  update({percentage, status} = {}) {
    this._percentage = percentage
    this._status = status
  }
}
