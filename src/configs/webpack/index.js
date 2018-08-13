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
  CONFIGS_DIR,
  getPackageDir,
  TOOLBOX_DIR,
} from '../../paths'

import debug from 'debug'
import HtmlPlugin from 'html-webpack-plugin'
import prettyFormat from 'pretty-format'
import {existsSync} from 'fs'
import {getSettings} from '../../settings'
import {join} from 'path'
import {NamedModulesPlugin} from 'webpack'

// Webpack’s loaders.
import assetRule from './rules/asset'
import cssModuleRule from './rules/css-module'
import cssRule from './rules/css'
import htmlRule from './rules/html'
import jsRule from './rules/js'

let log = debug('borela-js-toolbox:config:webpack')

const PRODUCTION = process.env.NODE_ENV === 'production'
const PROJECT_DIR = getPackageDir()
const BUILD_DIR = join(PROJECT_DIR, 'build')
const WEBPACK_CONFIG_DIR = join(CONFIGS_DIR, 'webpack')

// Paths used to search for modules and project’s files. It’ll first try to find
// any module on the project’s directory and then fallback to the toolbox, this
// should work for most cases as the toolbox only contain dependencies that
// would usually go into the “devDependencies” section.
const MODULE_PATHS = [
  join(PROJECT_DIR, 'node_modules'),
  join(TOOLBOX_DIR, 'node_modules'),
  join(PROJECT_DIR, 'src'),
  'node_modules',
  'src',
]

const CONFIG = {
  devServer: {
    contentBase: BUILD_DIR,
    historyApiFallback: true,
    port: 9000,
  },
  devtool: 'source-map',
  entry: [],
  externals: ['fs', 'module'],
  mode: PRODUCTION ? 'production' : 'development',
  module: {
    rules: [
      assetRule,
      cssModuleRule,
      cssRule,
      htmlRule,
      jsRule,
    ],
  },
  node: {
    // Disable polyfills.
    __dirname: false,
    __filename: false,
  },
  output: {
    path: BUILD_DIR,
    filename: '[name].js?[contenthash]',
  },
  performance: {
    hints: false,
  },
  plugins: [],
  resolve: {
    extensions: [
      '.css',
      '.html',
      '.js',
      '.json',
      '.jsx',
      '.module.css',
    ],
    modules: MODULE_PATHS,
  },
  resolveLoader: {
    modules: MODULE_PATHS,
  },
  target: 'web',
}

// Prints readable module names in the browser console on HMR updates.
// CONFIG.plugins.push(new NamedModulesPlugin())

const ENTRIES_DIR = join(WEBPACK_CONFIG_DIR, 'entries')
const REACT_16_ENTRY = join(ENTRIES_DIR, 'react-16')

// Use the default “main” entry point if a custom one is not found.
const DEFAULT_ENTRY = join(REACT_16_ENTRY, 'main.js')
const CUSTOM_ENTRY = join(PROJECT_DIR, 'src', 'main.js')

if (existsSync(CUSTOM_ENTRY))
  CONFIG.entry.push(CUSTOM_ENTRY)
else
  CONFIG.entry.push(DEFAULT_ENTRY)

// Template used to render the app.
const DEFAULT_TEMPLATE = join(REACT_16_ENTRY, 'index.html')
const CUSTOM_TEMPLATE = join(PROJECT_DIR, 'src', 'index.html')

CONFIG.plugins.push(new HtmlPlugin({
  template: existsSync(CUSTOM_TEMPLATE)
    ? CUSTOM_TEMPLATE
    : DEFAULT_TEMPLATE
}))

log(prettyFormat(CONFIG))
module.exports = CONFIG
