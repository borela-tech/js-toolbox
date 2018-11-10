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

import {
  configLoaded,
  projectTypeSet,
} from '../state/events'

/**
 * Loads the CLI config and update the store.
 *
 * @param store
 * Store that holds the CLI’s state.
 */
export function loadConfig(store) {
  // Location of the config files.
  let {
    directories: {
      project: {
        root: projectDir
      },
    },
  } = store.getState()

  // Try to find a configuration settings/file.
  const CONFIG_META = cosmiconfig('borela', {
    searchPlaces: [
      'package.json',
      'borela.json',
      'borela.yml',
      'borela.config.js',
    ],
  })
    .searchSync(projectDir)

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

  let {projectType, ...rest} = config

  // Remove the “production” flag just in case it is added to the configuration
  // accidentally.
  delete rest.production

  // Update the state with the loaded settings.
  store.dispatch(projectTypeSet(projectType))
  store.dispatch(configLoaded(rest))
}
