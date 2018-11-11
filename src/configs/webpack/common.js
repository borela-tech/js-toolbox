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

import babelPreset from '../babel-preset'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer'
import {existsSync} from 'fs'
import {join} from 'path'
import {StatsWriterPlugin} from 'webpack-stats-plugin'

import cssModuleRule from './rules/css-module'
import cssRule from './rules/css'
import defaultRule from './rules/default'
import htmlRule from './rules/html'
import jsRule from './rules/js'
import pugRule from './rules/pug'

/**
 * By default, the shared configuration look for 2 entry points:
 *
 *   main.js
 *   index.js
 *
 * This is useful when your project act both as an app by running the “main.js”
 * and a library by allowing the “index.js” to be imported.
 */
function getDefaultEntries(storeState) {
  let {
    directories: {
      project: {source: sourceDir},
    },
  } = storeState

  const PROJECT_MAIN = join(sourceDir, 'main.js')
  const PROJECT_INDEX = join(sourceDir, 'index.js')

  let result = {}

  if (existsSync(PROJECT_MAIN))
    result.main = PROJECT_MAIN

  if (existsSync(PROJECT_INDEX))
    result.index = PROJECT_INDEX

  return result
}

/**
 * Generate a common Webpack’s config based on CLI’s state.
 *
 * @param storeState
 * CLI’s current state.
 */
export default function (storeState) {
  let {
    directories: {
      project: {
        build: buildDir,
        modules: projectModulesDir,
        source: projectSourceDir,
        root: projectDir,
      },
      toolbox: {
        modules: toolboxModulesDir,
        root: toolboxDir,
      },
    },
    options: {
      bundleStats,
      disableSourceMaps,
      interactiveBundleStats,
      production,
    },
  } = storeState

  const BABEL_PRESET = babelPreset(storeState)
  const MODULE_PATHS = [
    projectModulesDir,
    toolboxModulesDir,
    projectSourceDir,
    'node_modules',
    'src',
  ]

  let result = {
    devtool: !disableSourceMaps && 'source-map',
    entry: getDefaultEntries(storeState),
    mode: production ? 'production' : 'development',
    module: {
      rules: [
        cssModuleRule(storeState),
        cssRule(storeState),
        htmlRule(),
        jsRule(BABEL_PRESET),
        pugRule(),
        // Fallback, just copy the files if the previous rules didn’t catch and
        // processed it as a module.
        defaultRule(storeState),
      ],
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
    output: {
      path: buildDir,
      filename: '[name].js',
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css?[contenthash]',
        chunkFilename: '[id].css?[contenthash]',
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
      modules: MODULE_PATHS,
    },
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
