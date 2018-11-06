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

import cosmiconfig from 'cosmiconfig'
import camelCaseKeys from 'camelcase-keys'
import store from '../state'

import {
  configLoaded,
  projectTypeSet,
} from '../state/events'

export function loadConfig() {
  // Location of the config files.
  let {directories:{project}} = store.getState()

  // Try to find a configuration setting/file.
  const CONFIG_META = cosmiconfig('borela', {
    searchPlaces: [
      'package.json',
      'borela.json',
      'borela.yml',
      'borela.config.js',
    ],
  })
    .searchSync(project)

  // No configuration found, we will use the default settings for node apps.
  if (!CONFIG_META) {
    store.dispatch(projectTypeSet('node-app'))
    return
  }

  // Make all keys camelcase.
  let config = camelCaseKeys(
    CONFIG_META.config,
    {deep: true},
  )

  // Update the state.
  let {projectType, ...rest} = config
  store.dispatch(projectTypeSet(projectType))
  store.dispatch(configLoaded(rest))
}
