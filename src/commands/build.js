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

import ora from 'ora'
import chalk from 'chalk'
import STORE from '../state'
import webpack from 'webpack'
import webpackConfig from '../configs/webpack'
import {addFlags} from './flags'

import {
  getModuleVersion,
  setUp,
} from './utils'

import {
  BROWSERS,
  BUNDLE_STATS,
  COMMENT_FLOW,
  DISABLE_EXPERIMENTAL_PLUGINS,
  DISABLE_SOURCE_MAPS,
  INCLUDE_POLYFILLS,
  JSX,
  MINIFY,
  MINIFY_CSS,
  MINIFY_HTML,
  MINIFY_JS,
  NODE,
  PLATFORMS,
  PRODUCTION,
  PROGRESS,
  PROJECT_TYPE,
  REACT,
  REMOVE_FLOW,
  TYPE_SCRIPT,
  WATCH,
} from './flags'

const BORELA = chalk.supportsColor
  ? chalk.inverse.bold.magenta(' BORELA TOOLBOX: ') + ' ' + chalk.inverse.bold.yellow(' 1.0.0 ')
  : 'Borela: 1.0.0'

const SUCCESS = chalk.supportsColor
  ? chalk.inverse.bold.green(' DONE ')
  : 'Done.'

function builder(yargs) {
  addFlags(yargs, [
    BROWSERS,
    BUNDLE_STATS,
    COMMENT_FLOW,
    DISABLE_EXPERIMENTAL_PLUGINS,
    DISABLE_SOURCE_MAPS,
    INCLUDE_POLYFILLS,
    JSX,
    MINIFY,
    MINIFY_CSS,
    MINIFY_HTML,
    MINIFY_JS,
    NODE,
    PLATFORMS,
    PRODUCTION,
    PROGRESS,
    PROJECT_TYPE,
    REACT,
    REMOVE_FLOW,
    TYPE_SCRIPT,
    WATCH,
  ])
}

function handler(args) {
  setUp(STORE, 'build', args)

  let spinner = ora({
    spinner: {
    interval: 80,
        frames: [
          '⠋',
          '⠙',
          '⠹',
          '⠸',
          '⠼',
          '⠴',
          '⠦',
          '⠧',
          '⠇',
          '⠏',
        ]
    },
    text: 'Building...',
  }).start()

  // const STATE = STORE.getState()
  // const WEBPACK_CONFIG = webpackConfig(STATE)
  // const COMPILER = webpack(WEBPACK_CONFIG)

  // let {watch} = STATE
  // if (!watch)
  //   COMPILER.run(reportBuild)
  // else
  //   COMPILER.watch(reportBuild)
}

function reportBuild(error, stats) {
  if (error) {
    reportException(error)
    return
  }

  // Simplify the stats.
  stats = stats.toJson('normal')

  let {
    builtAt,
    errors,
    hash,
    time,
    version,
    warnings,
  } = stats

  console.log()
  console.log(BORELA)
  console.log()
  console.log(`Webpack: ${version}`)
  console.log(`Hash: ${hash}`)
  console.log(`Build At: ${time}`)
  console.log(`Time: ${time}ms`)

  if (warnings.length > 0)
    reportWarnings(warnings)

  if (errors.length > 0) {
    reportErrors(errors)
  } else {
    console.log()
    console.log(SUCCESS)
  }
}

function reportException(exception) {
  // TODO..
}

function reportErrors(errors) {
  // TODO..
}

function reportWarnings(warnings) {
  // TODO..
}

export default {
  command: 'build [dir]',
  description: 'Build using Webpack.',
  builder,
  handler,
}
