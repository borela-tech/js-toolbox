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

import HtmlPlugin from 'html-webpack-plugin'
import shared from './shared'
import {CONFIGS_DIR, getProjectDir} from '../../paths'
import {existsSync} from 'fs'
import {join} from 'path'

const PROJECT_DIR = getProjectDir()
const PROJECT_SRC_DIR = join(PROJECT_DIR, 'src')
const WEBPACK_CONFIG_DIR = join(CONFIGS_DIR, 'webpack')
const ENTRIES_DIR = join(WEBPACK_CONFIG_DIR, 'entries')
const REACT_ENTRY_DIR = join(ENTRIES_DIR, 'react')

/**
 * This function will check if there’s an entry point “main.js” in the project’s
 * directory if it doesn’t find it, set to the default one. In 99% of the cases
 * the custom entry will not be needed specially because the default one wires
 * a bunch of helpers to trace bugs.
 */
function setEntryPoint(config) {
  const DEFAULT_ENTRY = join(REACT_ENTRY_DIR, 'main.js')
  const CUSTOM_ENTRY = join(PROJECT_SRC_DIR, 'main.js')

  if (existsSync(CUSTOM_ENTRY))
    config.entry = [CUSTOM_ENTRY]
  else
    config.entry = [DEFAULT_ENTRY]
}

/**
 * Check if there’s a custom HTML template for the app and if none is found, use
 * the default one. The custom template  might be useful if the programmer wants
 * to add extra information on the header without having to wait for react to
 * load.
 */
function setHtmlTemplate(config) {
  const DEFAULT_TEMPLATE = join(REACT_ENTRY_DIR, 'index.html')
  const CUSTOM_TEMPLATE = join(PROJECT_SRC_DIR, 'index.html')

  config.plugins.push(new HtmlPlugin({
    template: existsSync(CUSTOM_TEMPLATE)
      ? CUSTOM_TEMPLATE
      : DEFAULT_TEMPLATE
  }))
}

/**
 * Final configuration to build react applications.
 */
export default function () {
  let config = shared()

  config.output = {
    ...config.output,
    filename: 'script.js?[contenthash]',
    path: join(config.output.path, 'web'),
  }

  setEntryPoint(config)
  setHtmlTemplate(config)

  config.target = 'web'
  return [config]
}