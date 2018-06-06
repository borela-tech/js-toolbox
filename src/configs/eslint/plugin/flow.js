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

// https://github.com/gajus/eslint-plugin-flowtype#eslint-plugin-flowtype-rules
module.exports = {
  rules: {
    // Enforces a particular array type annotation style for complex types.
    'flowtype/array-style-complex-type': ['error', 'shorthand'],

    // Enforces a particular array type annotation style for simple types.
    'flowtype/array-style-simple-type': ['error', 'shorthand'],

    // Enforces a particular style for boolean type annotations.
    'flowtype/boolean-style': ['error', 'boolean'],

    // Used to suppress no-undef reporting of type identifiers.
    'flowtype/define-flow-type': 1,

    // Enforces consistent use of trailing commas in Object and Tuple
    // annotations.
    'flowtype/delimiter-dangle': ['error', 'always-multiline'],

    // Enforces consistent spacing within generic type annotation parameters.
    'flowtype/generic-spacing': ['error', 'never'],

    // This rule requires an empty line after the Flow annotation.
    'flowtype/newline-after-flow-annotation': ['warn', 'always'],

    // Checks for duplicate properties in Object annotations.
    'flowtype/no-dupe-keys': 'error',

    // Disallows flow fix me comment suppressions.
    'flowtype/no-flow-fix-me-comments': 'warn',

    // Requires use of $ReadOnlyArray instead of just Array or array shorthand
    // notation.
    'flowtype/no-mutable-array': 'off',

    // Disallows use of primitive constructors as types, such as Boolean, Number
    // and String.
    'flowtype/no-primitive-constructor-types': 'error',

    // Disallows Flow type imports, exports, aliases, and annotations in files
    // missing a valid Flow file declaration.
    'flowtype/no-types-missing-file-annotation': 'off',

    // An extension of ESLint’s no-unused-expressions. This rule ignores type
    // cast expressions, but otherwise behaves the same as ESLint’s
    // no-unused-expressions.
    'flowtype/no-unused-expressions': 'warn',

    // Warns against weak type annotations any, Object and Function. These types
    // can cause flow to silently skip over portions of your code, which would
    // have otherwise caused type errors.
    'flowtype/no-weak-types': 'off',

    // Enforces consistent separators between properties in Flow object types.
    'flowtype/object-type-delimiter': ['error', 'comma'],

    // This rule enforces exact object types.
    'flowtype/require-exact-type': 'off',

    // Requires that all function parameters have type annotations.
    'flowtype/require-parameter-type': 'off',

    // Requires that functions have return type annotation.
    'flowtype/require-return-type': 'off',

    // Requires all type declarations to be at the top of the file, after any
    // import declarations.
    'flowtype/require-types-at-top': 'off',

    // This rule validates Flow file annotations.
    'flowtype/require-valid-file-annotation': [
      'warn',
      'never', {
        annotationStyle: 'line',
      },
    ],

    // Requires that all variable declarators have type annotations.
    'flowtype/require-variable-type': 'off',

    // Enforces consistent use of semicolons after type aliases.
    'flowtype/semi': ['error', 'never'],

    // Enforces sorting of Object annotations.
    'flowtype/sort-keys': 'off',

    // Enforces consistent spacing after the type annotation colon.
    'flowtype/space-after-type-colon': ['error', 'never'],

    // Enforces consistent spacing before the opening of generic type annotation
    // parameters.
    'flowtype/space-before-generic-bracket': ['error', 'never'],

    // Enforces consistent spacing before the type annotation colon.
    'flowtype/space-before-type-colon': ['error', 'never'],

    // Enforces a consistent naming pattern for type aliases.
    'flowtype/type-id-match': 'off',

    // Enforces a particular style for type imports.
    'flowtype/type-import-style': 'error',

    // Enforces consistent spacing around union and intersection type separators
    // (| and &).
    'flowtype/union-intersection-spacing': ['error', 'always'],

    // Used to suppress no-unused-vars errors that are triggered by type
    // aliases.
    'flowtype/use-flow-type': 1,
  },
}
