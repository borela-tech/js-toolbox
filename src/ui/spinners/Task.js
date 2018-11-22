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

import Busy from './Busy'
import Percentage from './Percentage'
import Pulse from './Pulse'
import Spinner from '../Spinner'

import {
  bold,
  blue,
  green,
  yellow,
} from 'chalk'

export default class Task extends Spinner {
  _busySpinner = new Busy
  _percentageSpinner = new Percentage
  _pulseSpinner = new Pulse

  getNextFrame() {
    if (this.percentage)
      this._percentageSpinner.percentage = this.percentage

    let {frame: progressFrame} = this.percentage
      ? this._percentageSpinner.render()
      : this._busySpinner.render()

    let {frame: pulseFrame} = this._pulseSpinner.render()

    progressFrame = green(progressFrame)
    pulseFrame = yellow(pulseFrame)

    return {
      frame: `${progressFrame}${pulseFrame} ${this.status}`,
      lines: 1,
    }
  }
}
