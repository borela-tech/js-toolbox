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
  getProjectName,
  isPathSubDirOf,
  isProduction,
} from '../../utils'

import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer'
import {existsSync} from 'fs'
import {getProjectDir, TOOLBOX_DIR} from '../../paths'
import {getSettings} from '../../settings'
import {join, relative} from 'path'
import {StatsWriterPlugin} from 'webpack-stats-plugin'

// Webpack’s loaders.
import cssModuleRule from './rules/css-module'
import cssRule from './rules/css'
import jsRule from './rules/js'
import defaultRule from './rules/default'

const PROJECT_DIR = getProjectDir()
const PROJECT_SRC_DIR = join(PROJECT_DIR, 'src')
const PROJECT_BUILD_DIR = join(PROJECT_DIR, 'build')

let {
  bundleStats = false,
  disableSourceMaps = false,
  configDevServer = false,
  interactiveBundleStats = false,
  externals,
  minify,
  minifyJs,
  port = 9000,
  watch = false,
} = getSettings()

/**
 * By default, the shared configuration look for 2 entries, this is useful when
 * your project act both as an app by running the “main.js” and a library by
 * allowing the “index.js” to be imported.
 */
function getDefaultEntries() {
  let result = {}

  const PROJECT_MAIN = join(PROJECT_SRC_DIR, 'main.js')
  const PROJECT_INDEX = join(PROJECT_SRC_DIR, 'index.js')

  if (existsSync(PROJECT_MAIN))
    result.main = PROJECT_MAIN

  if (existsSync(PROJECT_INDEX))
    result.index = PROJECT_INDEX

  return result
}

/**
 * This function is used in “devtoolModuleFilenameTemplate” to create consistent
 * module paths and simplify the file structure on the browser’s debugger to be
 * as follows:
 *
 *     file://
 *       borela-js-toolbox
 *          entry
 *          node_modules
 *
 *       project-name
 *          node_modules
 *          src
 *
 *     webpack://
 *        ...
 */
function normalizeModulePath(info) {
  let identifier = info.identifier

  if (/^(webpack|\(webpack\))/.test(identifier))
    return `webpack:///${identifier}`

  const PROJECT_NAME = getProjectName()
  let path = info.absoluteResourcePath

  // When hot reloading, path is already correct.
  if (/\w+:\/{3}/.test(path))
    return path

  // Project sources.
  if (isPathSubDirOf(path, PROJECT_DIR)) {
    path = relative(PROJECT_DIR, path)
    path = path.replace(/\\/g, '/')
    return `file:///${PROJECT_NAME}/${path}`
  }

  // Toolbox sources.
  if (isPathSubDirOf(path, TOOLBOX_DIR)) {
    path = relative(TOOLBOX_DIR, path)
    path = path.replace(/\\/g, '/')

    // Simplify entry path.
    path = path.replace(/build\/configs\/webpack\/entries\/\w+/g, 'entry')

    return `file:///borela-js-toolbox/${path}`
  }

  throw new Error(`Invalid resource path “${path}”.`)
}

/**
 * This configuration holds the logic shared across all project types.
 */
export default function () {
  const MODULE_PATHS = [
    join(PROJECT_DIR, 'node_modules'),
    join(TOOLBOX_DIR, 'node_modules'),
    join(PROJECT_DIR, 'src'),
    'node_modules',
    'src',
  ]

  const STATS = {
    // Hide everything first, any property following this one will enable only
    // the features we want.
    all: false,
    // Asset table.
    assets: true,
    // Build date and time.
    builtAt: true,
    // Show errors.
    errors: true,
    // Build hash.
    hash: true,
    // Performance hints.
    performance: isProduction(),
    // Build time.
    timings: true,
    // Webpack version.
    version: true,
  }

  let result = {
    devtool: !disableSourceMaps && 'source-map',
    entry: getDefaultEntries(),
    mode: isProduction() ? 'production' : 'development',
    module: {
      rules: [{
        oneOf: [
          cssModuleRule(),
          cssRule(),
          jsRule(),
          // Fallback, just copy the files if the previous rules didn’t catch
          // the module.
          defaultRule(),
        ],
      }],
    },
    node: {
      // Disable polyfills.
      __dirname: false,
      __filename: false,
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
    output: {
      path: PROJECT_BUILD_DIR,
      filename: '[name].js',
      devtoolModuleFilenameTemplate: normalizeModulePath,
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
    ],
    resolve: {
      extensions: [
        '.js',
        '.jsx',
        '.mjs',
        '.json',
        '.module.css',
      ],
      modules: MODULE_PATHS,
    },
    resolveLoader: {
      modules: [
        // For now we don’t have any custom loaders, but this is here just in
        // case one is needed.
        join(__dirname, 'loaders'),
        // The other loaders will be searched like any other modules.
        ...MODULE_PATHS,
      ],
    },
    stats: STATS,
    watch,
  }

  if (externals) {
    // Exclude the target module from the bundle and set the global variable that
    // identifies it. This is usually used in conjuction with the HTML plugin to
    // insert CDN links at the “head” tag.
    result.externals = {}
    for (let {globalIdentifier, importIdentifier} of externals) {
      result.externals[importIdentifier] = globalIdentifier
    }
  }

  // Webpack’s development server.
  if (configDevServer) {
    result.devServer = {
      contentBase: PROJECT_BUILD_DIR,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
      },
      index: 'index.html',
      stats: STATS,
      port,
    }
  }

  // Minification settings.
  result.optimization.minimize = minify || minifyJs

  if (minify || minifyJs) {
    result.optimization.minimizer = [new UglifyJsPlugin({
      sourceMap: !disableSourceMaps,
      uglifyOptions: {
        output: {
          comments: false,
        },
      },
    })]
  }

  // Interactive tree map of the bundle.
  if (interactiveBundleStats)
    result.plugins.push(new BundleAnalyzerPlugin)

  // JSON file containing the bundle stats.
  if (bundleStats) {
    result.plugins.push(new StatsWriterPlugin({
      filename: 'bundle-stats.json',
      // Include everything.
      fields: null,
    }))
  }

  return result
}
