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

import {
  COMMAND_SET,
  CONFIG_LOADED,
  OPTIONS_SET,
  PROJECT_TYPE_SET,
} from '../../events/identifiers'

import BUILD_OPTIONS from './available/build'
import LINT_OPTIONS from './available/lint'
import SERVE_OPTIONS from './available/serve'
import START_OPTIONS from './available/start'
import TEST_OPTIONS from './available/test'

/**
 * Calculate the state of the options object after new options are set.
 */
function calculateOptionsState(state, newOptions) {
  if (!state)
    throw new Error('Command not set.')

  let result = {...state}
  let {minify, ...rest} = newOptions

  if (minify) {
    leftAssign(result, {
      minifyCss: true,
      minifyHtml: true,
      minifyJs: true,
    })
  }

  leftAssign(result, rest)
  return result
}

/**
 * Returns the available options for each command.
 */
function getCommandOptions(command) {
  switch (command) {
    case 'build':
      return BUILD_OPTIONS
    case 'lint':
      return LINT_OPTIONS
    case 'serve':
      return SERVE_OPTIONS
    case 'scaffold':
      return {}
    case 'start':
      return START_OPTIONS
    case 'test':
      return TEST_OPTIONS
  }

  throw new Error(`Unknown command “${command}”.`)
}

/**
 * Returns the default options for each project type.
 */
function getProjecTypeOptions(projectType) {
  switch (projectType) {
    case 'react-spa':
      return {
        commentFlow: true,
        jsx: true,
        react: true,
      }
  }
  return {}
}

/**
 * Get the properites from the right object and assign them to the left one if
 * they exists.
 */
function leftAssign(left, right) {
  for (let key in right) {
    if (key in left)
      left[key] = right[key]
  }
}

/**
 * Options reducer.
 */
export default function (state = null, event) {
  let {payload, type} = event

  switch (type) {
    // Load the available options for each command.
    case COMMAND_SET:
      return {...getCommandOptions(payload)}

    case CONFIG_LOADED:
      return calculateOptionsState(state, payload)

    // Load the default options per project type.
    case PROJECT_TYPE_SET:
      return calculateOptionsState(
        state,
        getProjecTypeOptions(payload)
      )

    // Set options directly.
    case OPTIONS_SET:
      return calculateOptionsState(state, payload)
  }

  return state
}
