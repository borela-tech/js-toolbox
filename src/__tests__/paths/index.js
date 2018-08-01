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

import {join} from 'path'

const FIXTURE = join(__dirname, '__fixture__')
const FOO = join(FIXTURE, 'foo')
const FOO_PACKAGE = join(FIXTURE, 'foo-package')
const FOO_BAR = join(FIXTURE, 'foo', 'bar')
const FOO_BAR_PACKAGE = join(FIXTURE, 'foo', 'bar-package')
const FOO_BAR_PACKAGE_BAZ = join(FIXTURE, 'foo', 'bar-package', 'baz')

describe.each([
  [FIXTURE, FIXTURE],
  [FOO, FIXTURE],
  [FOO_PACKAGE, FOO_PACKAGE],
  [FOO_BAR, FIXTURE],
  [FOO_BAR_PACKAGE, FOO_BAR_PACKAGE],
  [FOO_BAR_PACKAGE_BAZ, FOO_BAR_PACKAGE],
])('Package path helpers', (cwd, root) => {
  beforeEach(() => {
    jest.spyOn(process, 'cwd').mockImplementation(() => cwd)
  })

  afterEach(() => {
    jest.restoreAllMocks()
    jest.resetModules()
  })

  // The CLI’s current working directory is set to be the target package, this
  // test makes sure we are getting the correct package root.
  describe('PACKAGE_DIR', () => {
    test('It has the package’s root', () => {
      const {PACKAGE_DIR} = require('../../paths')
      expect(PACKAGE_DIR).toBe(root)
    })
  })

  describe('BORELA_JS', () => {
    test('It has the path to a “borela.js” file at the package’s root', () => {
      const {BORELA_JS} = require('../../paths')
      expect(BORELA_JS).toBe(join(root, 'borela.js'))
    })
  })

  describe('BORELA_JSON', () => {
    test('It has the path to a “borela.json” file at the package’s root', () => {
      const {BORELA_JSON} = require('../../paths')
      expect(BORELA_JSON).toBe(join(root, 'borela.json'))
    })
  })

  describe('PACKAGE_JSON', () => {
    test('It has the path to package’s “package.json”', () => {
      const {PACKAGE_JSON} = require('../../paths')
      expect(PACKAGE_JSON).toBe(join(root, 'package.json'))
    })
  })
})

// The following tests can be considered unnecessary but I added them to prevent
// accidental changes to the paths which could make the CLI hard to debug.

const TOOLBOX_ROOT = join(__dirname, '..', '..', '..')
const TOOLBOX_BIN = join(TOOLBOX_ROOT, 'node_modules', '.bin')
const TOOLBOX_CONFIGS = join(TOOLBOX_ROOT, 'build', 'configs')
const TOOLBOX_MODULES = join(TOOLBOX_ROOT, 'node_modules')
const TOOLBOX_TEMPLATES = join(TOOLBOX_ROOT, 'templates')

describe('Toolbox path helpers', () => {
  describe('TOOLBOX_DIR', () => {
    test('It has the toolbox’s root path', () => {
      const {TOOLBOX_DIR} = require('../../paths')
      expect(TOOLBOX_DIR).toBe(TOOLBOX_ROOT)
    })
  })

  describe('BIN_DIR', () => {
    test('It has the toolbox’s “.bin” path', () => {
      const {BIN_DIR} = require('../../paths')
      expect(BIN_DIR).toBe(TOOLBOX_BIN)
    })
  })

  describe('CONFIGS_DIR', () => {
    test('It has the toolbox’s configs path', () => {
      const {CONFIGS_DIR} = require('../../paths')
      expect(CONFIGS_DIR).toBe(TOOLBOX_CONFIGS)
    })
  })

  describe('MODULES_DIR', () => {
    test('It has the toolbox’s “node_modules” path', () => {
      const {MODULES_DIR} = require('../../paths')
      expect(MODULES_DIR).toBe(TOOLBOX_MODULES)
    })
  })

  describe('MODULES_DIR', () => {
    test('It has the toolbox’s templates path', () => {
      const {TEMPLATES_DIR} = require('../../paths')
      expect(TEMPLATES_DIR).toBe(TOOLBOX_TEMPLATES)
    })
  })
})
