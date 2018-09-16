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

import App from 'App'
import ErrorBoundary from './ErrorBoundary'
import React from 'react'
import {render} from 'react-dom'

const HTML_ROOT = document.getElementById('app')

if (module.hot) {
  let {AppContainer} = import('react-hot-loader')

  window.addEventListener('load', () => {
    render(
      <AppContainer>
        <ErrorBoundary>
          <App/>
        </ErrorBoundary>
      </AppContainer>,
      HTML_ROOT,
    )
  })

  module.hot.accept('App', () => {
    let ReloadedApp = require('App').default
    render(
      <AppContainer>
        <ErrorBoundary>
          <ReloadedApp/>
        </ErrorBoundary>
      </AppContainer>,
      HTML_ROOT,
    )
  })
} else {
  window.addEventListener('load', () => {
    render(
      <ErrorBoundary>
        <App/>
      </ErrorBoundary>,
      HTML_ROOT,
    )
  })
}
