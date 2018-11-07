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

import BUILD_OPTIONS from './build'
import LINT_OPTIONS from './lint'
import SERVE_OPTIONS from './serve'
import START_OPTIONS from './start'
import TEST_OPTIONS from './test'

/**
 * Returns the available options for each command.
 */
export function getAvailableOptions(command) {
  switch (command) {
    case 'build':
      return BUILD_OPTIONS
    case 'lint':
      return LINT_OPTIONS
    case 'serve':
      return SERVE_OPTIONS
    case 'start':
      return START_OPTIONS
    case 'test':
      return TEST_OPTIONS

    case 'location':
    case 'scaffold':
      return {}
  }

  throw new Error(`Unknown command “${command}”.`)
}
