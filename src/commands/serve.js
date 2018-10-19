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

import {CONFIGS_DIR, setTargetDir} from '../paths'
import {exitOnError, runCommandSync} from '../system'
import {exitOnPackageNotFound} from '../utils'
import {join} from 'path'
import {
  browsers,
  bundleStats,
  commentFlow,
  disableExperimentalPlugins,
  disableSourceMaps,
  includePolyfills,
  jsx,
  messagingPort,
  minify,
  minifyCss,
  minifyHtml,
  minifyJs,
  multiEntry,
  port,
  production,
  progress,
  projectType,
  react,
  removeFlow,
  typeScript,
} from '../flags'

const WEBPACK_CONFIG_PATH = join(CONFIGS_DIR, 'webpack')

function builder(yargs) {
  browsers(yargs)
  bundleStats(yargs)
  commentFlow(yargs)
  disableExperimentalPlugins(yargs)
  disableSourceMaps(yargs)
  includePolyfills(yargs)
  jsx(yargs)
  messagingPort(yargs)
  minify(yargs)
  minifyCss(yargs)
  minifyHtml(yargs)
  minifyJs(yargs)
  multiEntry(yargs)
  port(yargs)
  production(yargs)
  progress(yargs)
  progress(yargs)
  projectType(yargs)
  react(yargs)
  removeFlow(yargs)
  typeScript(yargs)
}

function handler(args) {
  setTargetDir(args.dir)
  exitOnPackageNotFound()

  let webpackArgs = [
    `--config "${WEBPACK_CONFIG_PATH}"`,
    '--hot --inline',
  ]

  if (args.progress)
    webpackArgs.push('--progress')

  exitOnError(runCommandSync('webpack-dev-server', {
    args: webpackArgs,
    env: {
      borela: 'serve',
      ...args,
    },
  }))
}

export default {
  command: 'serve [dir]',
  description: 'Serve using Webpack’s dev server.',
  builder,
  handler,
}
