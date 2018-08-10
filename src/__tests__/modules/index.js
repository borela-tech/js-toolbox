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

const FIXTURE_PATH = join(__dirname, '__fixture__')

// This module exists.
const FOO_MODULE = join(FIXTURE_PATH, 'foo')

// This module does not exist.
const BAR_MODULE = join(FIXTURE_PATH, 'bar')

jest.doMock('../../paths', () => ({
  MODULES_DIR: FIXTURE_PATH,
}))

describe('Module helpers', () => {
  describe('Module exists', () => {
    describe('assertModuleExists()', () => {
      test('Do nothing', () => {
        let {assertModuleExists} = require('../../modules')
        assertModuleExists('foo')
      })
    })

    describe('getBinaryPath()', () => {
      test('Returns the full path', () => {
        let {getModulePath} = require('../../modules')
        expect(getModulePath('foo')).toBe(FOO_MODULE)
      })
    })

    describe('getModulePackageJson()', () => {
      test('Returns the “package.json” from the module', () => {
        let {getModulePackageJson} = require('../../modules')
        expect(getModulePackageJson('foo')).toEqual({
          name: 'foo',
          version: 42,
        })
      })
    })

    describe('getModuleNameVersion()', () => {
      test('Returns the name and version from the module', () => {
        let {
          getModuleNameVersion,
          getModulePackageJson,
        } = require('../../modules')
        let json = getModulePackageJson('foo')
        expect(getModuleNameVersion('foo')).toEqual(`foo (v${json.version})`)
      })
    })
  })

  describe('Module does not exist', () => {
    describe('assertModuleExists()', () => {
      test('Throws an exception', () => {
        let {assertModuleExists} = require('../../modules')
        expect(() => assertModuleExists('bar')).toThrow()
      })
    })

    describe('getBinaryPath()', () => {
      test('Returns the full path', () => {
        let {getModulePath} = require('../../modules')
        expect(getModulePath('bar')).toBe(BAR_MODULE)
      })
    })
  })
})

describe('Babel plugin helpers', () => {
  const OPTIONS = {a: 1, b: 2, c: 3}
  const PLUGIN = join(FIXTURE_PATH, '@babel/plugin-foo')
  const PROPOSAL = join(FIXTURE_PATH, '@babel/plugin-proposal-foo')
  const SYNTAX = join(FIXTURE_PATH, '@babel/plugin-syntax-foo')
  const TRANSFORM = join(FIXTURE_PATH, '@babel/plugin-transform-foo')

  describe('babelPlugin()', () => {
    test('Returns the full path to the plugin', () => {
      let {babelPlugin} = require('../../modules')
      expect(babelPlugin('foo')).toBe(PLUGIN)
    })

    test('Returns the path and options in a array', () => {
      let {babelPlugin} = require('../../modules')
      expect(babelPlugin('foo', OPTIONS)).toEqual([PLUGIN, OPTIONS])
    })
  })

  describe('babelProposalPlugin()', () => {
    test('Returns the full path to the plugin', () => {
      let {babelProposalPlugin} = require('../../modules')
      expect(babelProposalPlugin('foo')).toBe(PROPOSAL)
    })

    test('Returns the path and options in a array', () => {
      let {babelProposalPlugin} = require('../../modules')
      expect(babelProposalPlugin('foo', OPTIONS))
        .toEqual([PROPOSAL, OPTIONS])
    })
  })

  describe('babelSyntaxPlugin()', () => {
    test('Returns the full path to the plugin', () => {
      let {babelSyntaxPlugin} = require('../../modules')
      expect(babelSyntaxPlugin('foo')).toBe(SYNTAX)
    })

    test('Returns the path and options in a array', () => {
      let {babelSyntaxPlugin} = require('../../modules')
      expect(babelSyntaxPlugin('foo', OPTIONS)).toEqual([SYNTAX, OPTIONS])
    })
  })

  describe('babelTransformPlugin()', () => {
    test('Returns the full path to the plugin', () => {
      let {babelTransformPlugin} = require('../../modules')
      expect(babelTransformPlugin('foo')).toBe(TRANSFORM)
    })

    test('Returns the path and options in a array', () => {
      let {babelTransformPlugin} = require('../../modules')
      expect(babelTransformPlugin('foo', OPTIONS))
        .toEqual([TRANSFORM, OPTIONS])
    })
  })
})
