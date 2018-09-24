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
import React, {StrictMode} from 'react'
import {render} from 'react-dom'

const ROOT = document.getElementById('root')

if (module.hot) {
  let {AppContainer} = require('react-hot-loader')

  window.addEventListener('load', () => {
    render(
      <StrictMode>
        <AppContainer>
          <ErrorBoundary>
            <App/>
          </ErrorBoundary>
        </AppContainer>
      </StrictMode>,
      ROOT,
    )
  })

  module.hot.accept('App', () => {
    let ReloadedApp = require('App').default
    render(
      <StrictMode>
        <AppContainer>
          <ErrorBoundary>
            <ReloadedApp/>
          </ErrorBoundary>
        </AppContainer>
      </StrictMode>,
      ROOT,
    )
  })
} else {
  window.addEventListener('load', () => {
    render(
      <StrictMode>
        <ErrorBoundary>
          <App/>
        </ErrorBoundary>
      </StrictMode>,
      ROOT,
    )
  })
}
