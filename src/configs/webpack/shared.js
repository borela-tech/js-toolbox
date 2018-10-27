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
import {getSettings} from '../toolbox-settings'
import {join, relative} from 'path'
import {StatsWriterPlugin} from 'webpack-stats-plugin'

// Webpack’s loaders.
import cssModuleRule from './rules/css-module'
import cssRule from './rules/css'
import defaultRule from './rules/default'
import htmlRule from './rules/html'
import jsRule from './rules/js'
import pugRule from './rules/pug'

const PROJECT_DIR = getProjectDir()
const PROJECT_SRC_DIR = join(PROJECT_DIR, 'src')
const PROJECT_BUILD_DIR = join(PROJECT_DIR, 'build')

let {
  borela,
  bundleStats = false,
  disableSourceMaps = false,
  interactiveBundleStats = false,
  externals,
  minify,
  minifyJs,
  port = 9000,
  watch = false,
} = getSettings()

/**
 * Configure the stats generation.
 */
function configureBundleStats(config) {
  // Interactive tree map of the bundle.
  if (interactiveBundleStats)
    config.plugins.push(new BundleAnalyzerPlugin)

  // JSON file containing the bundle stats.
  if (bundleStats) {
    config.plugins.push(new StatsWriterPlugin({
      filename: 'bundle-stats.json',
      // Include everything.
      fields: null,
    }))
  }
}

/**
 * We are only including configuration for the dev server when the “serve”
 * command is executed.
 */
function configureDevServer(config) {
  if (borela !== 'serve')
    return
  config.devServer = {
    contentBase: PROJECT_BUILD_DIR,
    headers: {
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Origin': '*',
    },
    index: 'index.html',
    stats: config.stats,
    watchContentBase: true,
    port,
  }
}

/**
 * Exclude the target module from the bundle and set the global variable that
 * identifies it. This is usually used in conjuction with the HTML plugin to
 * insert CDN links at the “head” tag.
 */
function configureExternals(config) {
  if (!externals)
    return
  config.externals = {}
  for (let {globalIdentifier, importIdentifier} of externals)
    config.externals[importIdentifier] = globalIdentifier
}

/**
 * Configure the minifier to compress the final bundle.
 */
function configureJsMinification(config) {
  if (!(minify || minifyJs))
    return
  config.optimization.minimize = true
  config.optimization.minimizer = [new UglifyJsPlugin({
    sourceMap: !disableSourceMaps,
    uglifyOptions: {
      output: {
        comments: false,
      },
    },
  })]
}

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
 *     webpack://
 *       Borela JS Toolbox
 *          entries
 *          node_modules
 *
 *       project-name
 *          node_modules
 *          src
 *
 *       Webpack
 *         ...
 *
 *       Webpack Development Server
 *         ...
 *
 */
function normalizeModulePath(info) {
  let {
    absoluteResourcePath:path,
    identifier,
  } = info

  // Hot reloading, path is already correct.
  if (/\w+:\/{3}/.test(path))
    return path

  // Webpack files comes as:
  //
  //    webpack/...
  //    (wenpack)/...
  //    (webpack)-dev-server/...
  //
  // This initial pass will normalize them to:
  //
  //    Webpack
  //    Webpack Development Server
  //
  identifier = identifier.replace(
    /\(webpack\)-dev-server/,
    'Webpack Development Server',
  )

  identifier = identifier.replace(
    /webpack|\(webpack\)/,
    'Webpack',
  )

  // Adding missing “.js” extension will enable syntax highlighting on some
  // browsers that requires it e.g.: Firefox.
  if (identifier.includes('?')) {
    // Query.
    if (/(?<!\.\w+)\?/.test(identifier))
      identifier = identifier.replace('?', '.js?')
  } else {
    if (identifier.endsWith('/')) {
      // Transform the context require into a “file.js?sync...”.
      let [, path, query] = identifier.match(/^(.+)\s(a?sync.+)$/)
      identifier = `${path}.js?${query}`
    } else {
      // Add “.js” to files without extension.
      if (!/\.\w+$/.test(identifier))
        identifier += '.js'
    }
  }

  // Webpack sources.
  if (identifier.startsWith('Webpack'))
    return `webpack:///${identifier}`

  // Project sources.
  if (isPathSubDirOf(path, PROJECT_DIR)) {
    path = relative(PROJECT_DIR, path)
    path = path.replace(/\\/g, '/')
    return `webpack:///${getProjectName()}/${path}`
  }

  // Toolbox sources.
  if (isPathSubDirOf(path, TOOLBOX_DIR)) {
    path = relative(TOOLBOX_DIR, path)
    path = path.replace(/\\/g, '/')

    return `webpack:///Borela JS Toolbox/${path}`
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
      rules: [
        cssModuleRule(),
        cssRule(),
        htmlRule(),
        jsRule(),
        pugRule(),
        // Fallback, just copy the files if the previous rules didn’t catch
        // the module.
        defaultRule(),
      ],
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

  configureExternals(result)
  configureDevServer(result)
  configureJsMinification(result)
  configureBundleStats(result)

  return result
}
