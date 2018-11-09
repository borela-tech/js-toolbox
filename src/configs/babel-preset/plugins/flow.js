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

/**
 * Add Flow plugins if necessary.
 *
 * @param storeState
 * CLI’s current state.
 */
export default function ({storeState, preset}) {
  let {
    options: {
      commentFlow,
      flow,
      removeFlow,
    },
  } = storeState

  if (!flow && !commentFlow && !removeFlow)
    return {storeState, preset}

  let {plugins} = preset

  // Parse Flow annoations.
  plugins.push('@babel/plugin-syntax-flow')

  // Comment Flow annotations.
  if (commentFlow)
    plugins.push('@babel/plugin-transform-flow-comments')

  // Remove Flow annotations.
  if (removeFlow)
    plugins.push('@babel/plugin-transform-flow-strip-types')

  return {storeState, preset}
}
