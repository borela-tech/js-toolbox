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

import Overlay from './overlay'
import React, {Component} from 'react'
import {mapStackTrace} from 'sourcemapped-stacktrace'

/**
 * Return the a new mapped stack where each item is an object with properties
 * for line, column, namespace and file path.
 */
function parseMappedStack(stack) {
  let result = []
  for (let line of stack) {
    // at ... (file:///namespace/path:line:column)
    const MATCHED = line.match(/\(.*?:\/{3}(.*?)\/(.*):(.*?):(.*?)\)$/)

    // The line couldn’t be parsed.
    if (!MATCHED){
      result.push({stackLine: line})
      continue
    }

    result.push({
      column: MATCHED[4],
      line: MATCHED[3],
      namespace: MATCHED[1],
      path: MATCHED[2],
      stackLine: line,
    })
  }
  return result
}

export class ErrorBoundary extends Component {
  static defaultProps = {renderTime: 0}
  state = {errorTime: 0}

  componentDidCatch(error) {
    // Stop rendering the UI immediately.
    this.setState({errorTime: new Date})

    // Map the error stack to the available source maps.
    mapStackTrace(error.stack, mappedStack => {
      // Prepare the mapped stack.
      error.stack = mappedStack
        |> parseMappedStack
      // window.__BORELA__.showOverlay(error)
    })
  }

  render() {
    let {errorTime} = this.state
    let {children, renderTime} = this.props

    // An error occurred since the boundary was rendered.
    if (errorTime > renderTime)
      return null

    // The error is stale.
    return children
  }
}

export default ErrorBoundary
