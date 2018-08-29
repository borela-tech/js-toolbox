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

import ErrorBox from './ErrorBox'
import React, {Component} from 'react'
import {mapStackTrace} from 'sourcemapped-stacktrace'

/**
 * Return the a new mapped stack where each item is an object with properties
 * for line, column and file path.
 */
function preparedMappedStack(stack) {
  let result = []
  for (let line of stack) {
    // at ... (file:///namespace/path:line:column)
    const MATCHED = line.match(/\(.+?:\/{3}(.+?)\/(.+):(.+):(.+)\)/)

    // Ignore any line that is not expected.
    if (!MATCHED)
      continue

    result.push({
      column: MATCHED[4],
      line: MATCHED[3],
      namespace: MATCHED[1],
      path: MATCHED[2],
    })
  }
  return result
}

export default class ErrorBoundary extends Component {
  state = {hasError: false}

  componentDidCatch(error, info) {
    mapStackTrace(error.stack, mappedStack => {
      // Prepare the mapped stack.
      error.stack = mappedStack
        |> preparedMappedStack
      // Show the error box.
      this.setState({error, hasError: true})
    })
  }

  render() {
    return this.state.hasError
      ? <ErrorBox {...this.state}/>
      : this.props.children
  }
}
