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

import BusySpinner from './Busy'
import chalk from 'chalk'
import PercentageSpinner from './Percentage'
import PulseSpinner from './Pulse'
import Spinner from '../Spinner'

export default class Full extends Spinner {
  percentage = undefined
  status = '...'

  busySpinner = new BusySpinner
  percentageSpinner = new PercentageSpinner
  pulseSpinner = new PulseSpinner

  constructor({percentage, status}) {
    super()
    this.percentage = percentage
    this.status = status
  }

  getFrame(i) {
    if (this.percentage) {
      this.percentageSpinner.percentage = this.percentage

      const PERCENTAGE_FRAME = chalk.green(this.percentageSpinner.tick())
      const PULSE_FRAME = chalk.bold.yellow(this.pulseSpinner.tick())

      return `${PERCENTAGE_FRAME}${PULSE_FRAME} ${this.status}`
    }

    const BUSY_FRAME = chalk.bold.blue(this.busySpinner.tick())
    const PULSE_FRAME = chalk.bold.yellow(this.pulseSpinner.tick())

    return `${BUSY_FRAME}${PULSE_FRAME} ${this.status}`
  }
}
