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
  SET_COMMAND,
  SET_PROJECT_TYPE,
  SET_OPTIONS,
} from '../actions/identifiers'

const BROWSERS = ['>= 0.5%', 'not ie 11', 'not op_mini all']
const NODE = '10.13'

/**
 * Available options for the “build” command.
 */
const BUILD_OPTIONS = {
  browsers: BROWSERS,
  bundleStats: false,
  commentFlow: false,
  disableExperimentalPlugins: false,
  disableSourceMaps: false,
  includePolyfills: false,
  jsx: false,
  minifyCss: false,
  minifyHtml: false,
  minifyJs: false,
  node: NODE,
  production: false,
  progress: false,
  react: false,
  removeFlow: false,
  typeScript: false,
  watch: false,
}

/**
 * Available options for the “lint” command.
 */
const LINT_OPTIONS = {
  disableExperimentalPlugins: false,
  disableSourceMaps: false,
  flow: false,
  jsx: false,
  progress: false,
  react: false,
  typeScript: false,
}

/**
 * Available options for the “serve” command.
 */
const SERVE_OPTIONS = {
  browsers: BROWSERS,
  bundleStats: false,
  commentFlow: false,
  disableExperimentalPlugins: false,
  disableSourceMaps: false,
  includePolyfills: false,
  jsx: false,
  minifyCss: false,
  minifyHtml: false,
  minifyJs: false,
  port: 9000,
  production: false,
  progress: false,
  react: false,
  removeFlow: false,
  typeScript: false,
}

/**
 * Available options for the “start” command.
 */
const START_OPTIONS = {
  appArgs: undefined,
  debug: false,
}

/**
 * Available options for the “test” command.
 */
const TEST_OPTIONS = {
  browsers: BROWSERS,
  bundleStats: false,
  commentFlow: false,
  disableExperimentalPlugins: false,
  disableSourceMaps: false,
  includePolyfills: false,
  jsx: false,
  node: NODE,
  progress: false,
  react: false,
  removeFlow: false,
  typeScript: false,
  watch: false,
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
export default function (state = null, action) {
  let {payload, type} = action

  switch (type) {
    // Load the available options for each command.
    case SET_COMMAND:
      const COMMAND_OPTIONS = getCommandOptions(payload.command)
      return {...COMMAND_OPTIONS}

    // Set options directly or by use a preset by project type.
    case SET_PROJECT_TYPE:
    case SET_OPTIONS:
      if (!state)
        throw new Error('Available options not set.')

      const OPTIONS = {...state}
      let {minify, ...rest} = type == SET_PROJECT_TYPE
        ? getProjecTypeOptions(payload)
        : payload

      if (minify) {
        leftAssign(OPTIONS, {
          minifyCss: true,
          minifyHtml: true,
          minifyJs: true,
        })
      }

      leftAssign(OPTIONS, rest)
      return OPTIONS
  }

  return state
}
