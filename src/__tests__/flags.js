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
  appArgs,
  browsers,
  bundleStats,
  commentFlow,
  disableExperimentalPlugins,
  disableSourceMaps,
  flow,
  includePolyfills,
  inspect,
  jsx,
  interactiveBundleStats,
  minify,
  minifyCss,
  minifyHtml,
  minifyJs,
  multiEntry,
  node,
  platforms,
  port,
  production,
  progress,
  projectType,
  react,
  removeFlow,
  typeScript,
  watch,
} from '../flags'

const YARGS_STUB = {
  option(value) {
    expect(value.default).toBeUndefined()
  },
}

// Default values must be handled by the settings function alone, this is due
// to the fact that anything set on the CLI will be passed to the sub processes
// through a ENV variable, at that point is impossible to distinguish values set
// by the user vs default values.
test('None of them have a default value set', () => {
  appArgs(YARGS_STUB)
  browsers(YARGS_STUB)
  bundleStats(YARGS_STUB)
  commentFlow(YARGS_STUB)
  disableExperimentalPlugins(YARGS_STUB)
  disableSourceMaps(YARGS_STUB)
  flow(YARGS_STUB)
  includePolyfills(YARGS_STUB)
  inspect(YARGS_STUB)
  jsx(YARGS_STUB)
  interactiveBundleStats(YARGS_STUB)
  minify(YARGS_STUB)
  minifyCss(YARGS_STUB)
  minifyHtml(YARGS_STUB)
  minifyJs(YARGS_STUB)
  multiEntry(YARGS_STUB)
  node(YARGS_STUB)
  platforms(YARGS_STUB)
  port(YARGS_STUB)
  production(YARGS_STUB)
  progress(YARGS_STUB)
  projectType(YARGS_STUB)
  react(YARGS_STUB)
  removeFlow(YARGS_STUB)
  typeScript(YARGS_STUB)
  watch(YARGS_STUB)
})
