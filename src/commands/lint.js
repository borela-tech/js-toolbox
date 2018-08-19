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
  browsers,
  flow,
  jsx,
  node,
  platforms,
  react,
  typeScript,
} from '../flags'
import {CONFIGS_DIR, getProjectDir, setTargetDir} from '../paths'
import {join} from 'path'
import {exitOnError, runCommandSync} from '../system'
import {exitOnPackageNotFound} from '../util'

const CONFIG_PATH = join(CONFIGS_DIR, 'eslint', 'index.js')

function builder(yargs) {
  browsers(yargs)
  flow(yargs)
  jsx(yargs)
  node(yargs)
  platforms(yargs)
  react(yargs)
  typeScript(yargs)

  yargs.option('fix', {
    description: 'Fix lint errors.',
  })
}

function lintSources(args) {
  let eslintArgs = [
    '--ignore-pattern "src/**/__tests__"',
    '--ignore-pattern "src/**/__tests__/**"',
    `--config "${CONFIG_PATH}"`,
    `"${join(getProjectDir(), 'src')}"`,
  ]

  let {fix} = args
  if (fix)
    eslintArgs.push('--fix')

  return runCommandSync('eslint', {
    args: eslintArgs,
    env: args,
  })
}

function lintTests(args) {
  let eslintArgs = [
    '--ignore-pattern "src/**"',
    '--ignore-pattern "!**/__tests__"',
    '--ignore-pattern "!**/__tests__/**"',
    `--config "${CONFIG_PATH}"`,
    `"${join(getProjectDir(), 'src')}"`,
  ]

  let {fix} = args
  if (fix)
    eslintArgs.push('--fix')

  return runCommandSync('eslint', {
    args: eslintArgs,
    env: {...args, jest: true},
  })
}

function handler(args) {
  setTargetDir(args.dir)
  exitOnPackageNotFound()

  const STDOUT = process.stdout
  STDOUT.write('[0/2] Linting sources...\n')
  let resultSources = lintSources(args)
  STDOUT.write('[1/2] Linting tests...\n')
  let resultTests = lintTests(args)
  STDOUT.write('[2/2] Done.')

  exitOnError(resultSources)
  exitOnError(resultTests)
}

export default {
  command: 'lint [dir]',
  description: 'Lint using ESLint.',
  builder,
  handler,
}
