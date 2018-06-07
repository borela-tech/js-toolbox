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

import {CONFIGS_DIR, PACKAGE_DIR} from '../paths'
import {EPILOG, PROLOG, SEPARATOR} from '../banner'
import {join} from 'path'
import {getModuleNameVersion} from '../modules'
import {runBinPiped} from '../binaries'

const ESLINT_CONFIG_PATH = join(CONFIGS_DIR, 'eslint', 'index.js')
const ESLINT_ARGS = [
  '--ignore-pattern',
  'build/**',
  '--config',
  ESLINT_CONFIG_PATH,
  PACKAGE_DIR,
]

function logBuffer(buffer:Buffer) {
  if (buffer.length)
    console.log(buffer.toString().replace(/\n+$/, ''))
}

export default {
  command: 'lint',
  description: 'Check or fix code style.',
  builder: yargs => yargs.option('fix', {
    description: 'Fix lint errors.',
  }),
  handler: env => {
    let sourceArgs = ['--ignore-pattern', '**/__tests__/**', ...ESLINT_ARGS]
    let testsArgs = [
      '--ignore-pattern',
      'src/**',
      '--ignore-pattern',
      '!**/__tests__',
      '--ignore-pattern',
      '!**/__tests__/**',
      ...ESLINT_ARGS
    ]

    if (env.fix) {
      sourceArgs.push('--fix')
      testsArgs.push('--fix')
    }

    console.log(PROLOG)
    console.log('Linter: %s', getModuleNameVersion('ESlint'))
    console.log(SEPARATOR)
    console.log()

    console.log('    [1/2] Linting sources...')

    let {
      stdout: outSources,
      stderr: errorSources,
    } = runBinPiped('eslint', sourceArgs, env)

    logBuffer(errorSources)
    logBuffer(outSources)

    console.log()
    console.log('    [2/2] Linting tests...')

    let {
      stdout: outTests,
      stderr: errorTests,
    } = runBinPiped('eslint', testsArgs, { jest: true, ...env})

    logBuffer(errorTests)
    logBuffer(outTests)

    console.log()
    console.log(EPILOG)
  },
}
