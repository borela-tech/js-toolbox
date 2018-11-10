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

import STORE from '../state'
import {addFlags} from './flags'
import {setUp} from './utils'

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
  PRODUCTION,
  PROGRESS,
  PROJECT_TYPE,
  REACT,
  REMOVE_FLOW,
  TYPE_SCRIPT,
  WATCH,
} from './flags'

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
  console.log(STORE.getState())
}

export default {
  command: 'build [dir]',
  description: 'Build using Webpack.',
  builder,
  handler,
}
