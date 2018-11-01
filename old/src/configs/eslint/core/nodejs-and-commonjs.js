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

// http://eslint.org/docs/rules/#nodejs-and-commonjs
module.exports = {
  rules: {
    // This rule is aimed at ensuring that callbacks used outside of the main
    // function block are always part-of or immediately preceding a return
    // statement.
    'callback-return': 'off',

    // This rule requires all calls to require() to be at the top level of the
    // module, similar to ES6 import and export statements, which also can occur
    // only at the top level.
    'global-require': 'off',

    // This rule expects that when you’re using the callback pattern in Node.js
    // you’ll handle the error.
    'handle-callback-err': 'off',

    // This rule disallows calling and constructing the Buffer() constructor.
    'no-buffer-constructor': 'error',

    // When this rule is enabled, each var statement must satisfy the following
    // conditions:
    //   * Either none or all variable declarations must be require
    //     declarations.
    //   * All require declarations must be of the same type.
    'no-mixed-requires': 'off',

    // This rule aims to eliminate use of the new require expression.
    'no-new-require': 'error',

    // This rule aims to prevent string concatenation of directory paths.
    'no-path-concat': 'warn',

    // This rule is aimed at discouraging use of “process.env” to avoid global
    // dependencies.
    'no-process-env': 'off',

    // His rule aims to prevent the use of “process.exit”.
    'no-process-exit': 'off',

    // The rule takes one or more strings as options: the names of restricted
    // modules.
    'no-restricted-modules': 'off',

    // This rule is aimed at preventing synchronous methods from being called.
    'no-sync': 'off',
  },
}
