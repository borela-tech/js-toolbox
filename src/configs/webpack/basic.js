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

import {existsSync} from 'fs'
import {getPackageDir} from '../../paths'
import {getPorjectName} from '../../util'
import {getSettings} from '../../settings'
import {join} from 'path'
import {NamedModulesPlugin} from 'webpack'

// Webpack’s loaders.
import assetRule from './rules/asset'
import cssModuleRule from './rules/css-module'
import cssRule from './rules/css'
import htmlRule from './rules/html'
import jsRule from './rules/js'

const PRODUCTION = process.env.NODE_ENV === 'production'
const PROJECT_DIR = getPackageDir()
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
  multiEntry,
} = getSettings()

function getEntry() {
  if (!multiEntry) {
    return existsSync(join(PROJECT_DIR, 'src', 'main.js'))
      ? {main: 'main'}
      : {index: 'index'}
  }
  // TODO.
  throw Error('Multi entry not supported yet.')
}

export default function (){
  return {
    devServer: {
      contentBase: BUILD_DIR,
      historyApiFallback: true,
      port: 9000,
    },
    devtool: !disableSourceMaps && 'source-map',
    entry: getEntry(),
    externals: [],
    mode: PRODUCTION ? 'production' : 'development',
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
    },
    output: {
      path: BUILD_DIR,
      filename: '[name].js',
      //   ? 'script.js?[contenthash]'
      //   : '[name].js',
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
