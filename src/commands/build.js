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
  browsers,
  bundleStats,
  commentFlow,
  disableExperimentalPlugins,
  disableSourceMaps,
  jsx,
  includePolyfills,
  interactiveBundleStats,
  minify,
  minifyCss,
  minifyHtml,
  minifyJs,
  multiEntry,
  node,
  platforms,
  production,
  progress,
  projectType,
  react,
  removeFlow,
  typeScript,
  watch,
} from '../flags'
import {CONFIGS_DIR, setTargetDir} from '../paths'
import {join} from 'path'
import {exitOnError, runCommandSync} from '../system'
import {exitOnPackageNotFound} from '../utils'

const WEBPACK_CONFIG_PATH = join(CONFIGS_DIR, 'webpack')

function builder(yargs) {
  browsers(yargs)
  bundleStats(yargs)
  commentFlow(yargs)
  disableExperimentalPlugins(yargs)
  disableSourceMaps(yargs)
  includePolyfills(yargs)
  interactiveBundleStats(yargs)
  jsx(yargs)
  minify(yargs)
  minifyCss(yargs)
  minifyHtml(yargs)
  minifyJs(yargs)
  multiEntry(yargs)
  node(yargs)
  platforms(yargs)
  production(yargs)
  progress(yargs)
  projectType(yargs)
  react(yargs)
  removeFlow(yargs)
  typeScript(yargs)
  watch(yargs)
}

function handler(args) {
  setTargetDir(args.dir)
  exitOnPackageNotFound()

  if (args.production)
    process.env.NODE_ENV = 'production'

  let webpackArgs = [`--config "${WEBPACK_CONFIG_PATH}"`]
  if (args.progress)
    webpackArgs.push('--progress')

  exitOnError(runCommandSync('rimraf', {args: ['"build"']}))
  exitOnError(runCommandSync('webpack', {
    args: webpackArgs,
    env: {...args},
  }))
}

export default {
  command: 'build [dir]',
  description: 'Build using Webpack.',
  builder,
  handler,
}
