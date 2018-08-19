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

import UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import {existsSync} from 'fs'
import {getPackageDir} from '../../paths'
import {getSettings} from '../../settings'
import {isProduction} from '../../util'
import {join} from 'path'
import {NamedModulesPlugin} from 'webpack'

// Webpack’s loaders.
import assetRule from './rules/asset'
import cssModuleRule from './rules/css-module'
import cssRule from './rules/css'
import htmlRule from './rules/html'
import jsRule from './rules/js'

const PROJECT_DIR = getPackageDir()
const SRC_DIR = join(PROJECT_DIR, 'src')
const BUILD_DIR = join(PROJECT_DIR, 'build')

const MODULE_PATHS = [
  join(PROJECT_DIR, 'node_modules'),
  join(PROJECT_DIR, 'src'),
  'node_modules',
  'src',
]

let {
  disableSourceMaps,
  minify = false,
} = getSettings()

function getDefaultEntries() {
  let result = {}

  if (existsSync(join(SRC_DIR, 'main.js')))
    result.main = 'main'

  if (existsSync(join(SRC_DIR, 'index.js')))
    result.index = 'index'

  return result
}

export default function () {
  const MINIMIZER = {
    minimizer: [new UglifyJsPlugin()],
  }

  return {
    devServer: {
      contentBase: BUILD_DIR,
      historyApiFallback: true,
      port: 9000,
    },
    devtool: !disableSourceMaps && 'source-map',
    entry: getDefaultEntries(),
    mode: isProduction() ? 'production' : 'development',
    module: {
      rules: [
        assetRule(),
        cssModuleRule(),
        cssRule(),
        htmlRule(),
        jsRule(),
      ],
    },
    node: {
      // Disable polyfills.
      __dirname: false,
      __filename: false,
    },
    optimization: {
      minimize: minify,
      ...minify && MINIMIZER,
    },
    output: {
      path: BUILD_DIR,
      filename: '[name].js',
    },
    performance: {
      hints: false,
    },
    plugins: [new NamedModulesPlugin()],
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
  }
}
