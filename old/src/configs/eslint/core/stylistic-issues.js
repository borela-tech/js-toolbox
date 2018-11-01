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

// http://eslint.org/docs/rules/#stylistic-issues
module.exports = {
  rules: {
    // This rule enforces line breaks after opening and before closing array
    // brackets.
    'array-bracket-newline': ['error', 'consistent'],

    // This rule enforces consistent spacing inside array brackets.
    'array-bracket-spacing': ['error', 'never'],

    // This rule enforces line breaks between array elements.
    'array-element-newline': 'off',

    // This rule enforces consistent spacing inside single-line blocks.
    'block-spacing': ['error', 'never'],

    // This rule enforces consistent brace style for blocks.
    'brace-style': ['error', '1tbs'],

    // This rule enforces consistent variable naming.
    camelcase: 'off',

    // This rule aims to enforce a consistent style of comments across your
    // codebase, specifically by either requiring or disallowing a capitalized
    // letter as the first word character in a comment.
    'capitalized-comments': [
      'error',
      'always',
      {ignoreConsecutiveComments: true},
    ],

    // This rule enforces consistent use of trailing commas in object and array
    // literals.
    'comma-dangle': ['error', 'always-multiline'],

    // This rule enforces consistent spacing before and after commas in variable
    // declarations, array literals, object literals, function parameters, and
    // sequences.
    'comma-spacing': ['error'],

    // This rule enforce consistent comma style in array literals, object
    // literals, and variable declarations.
    'comma-style': ['error', 'last'],

    // This rule enforces consistent spacing inside computed property brackets.
    'computed-property-spacing': ['error', 'never'],

    // This rule enforces two things about variables with the designated alias
    // names for “this”:
    //   * If a variable with a designated name is declared, it must be either
    //     initialized or assigned the value “this”.
    //   * If a variable is initialized or assigned the value “this”, the name
    //     of the variable must be a designated alias.
    'consistent-this': 'off',

    // This rule enforces at least one newline (or absence thereof) at the end
    // of non-empty files.
    'eol-last': ['error', 'always'],

    // This rule requires or disallows spaces between the function name and the
    // opening parenthesis that calls it.
    'func-call-spacing': ['error', 'never'],

    // This rule requires function names to match the name of the variable or
    // property to which they are assigned. The rule will ignore property
    // assignments where the property name is a literal that is not a valid
    // identifier in the ECMAScript version specified in your configuration
    // (default ES5).
    'func-name-matching': 'off',

    // This rule can enforce or disallow the use of named function expressions.
    'func-names': 'off',

    // This rule enforces a particular type of function style throughout a
    // JavaScript file, either declarations or expressions.
    'func-style': [
      'error',
      'declaration',
      {allowArrowFunctions: true},
    ],

    // This rule enforces consistent line breaks inside parentheses of function
    // parameters or arguments.
    'function-paren-newline': ['error', 'consistent'],

    // This rule disallows specified identifiers in assignments and function
    // definitions.
    'id-blacklist': 'off',

    // This rule enforces a minimum and/or maximum identifier length convention.
    'id-length': 'off',

    // This rule requires identifiers in assignments and function definitions to
    // match a specified regular expression.
    'id-match': 'off',

    // This rule enforces a consistent indentation style.
    indent: ['error', 2, {SwitchCase: 1}],

    // This rule enforces the consistent use of either double or single quotes
    // in JSX attributes.
    'jsx-quotes': ['error', 'prefer-double'],

    // This rule enforces consistent spacing between keys and values in object
    // literal properties.
    'key-spacing': 'error',

    // This rule enforces consistent spacing around keywords.
    'keyword-spacing': 'error',

    // This rule enforces consistent position of line comments.
    'line-comment-position': [
      'error',
      // Enforces line comments only above code, in its own line.
      'above',
    ],

    // This rule enforces consistent line endings independent of operating
    // system.
    'linebreak-style': ['error', 'unix'],

    // This rule improves readability by enforcing lines between class members.
    // It will not check empty lines before the first member and after the last
    // member, since that is already taken care of by padded-blocks.
    'lines-between-class-members': 'off',

    // This rule requires empty lines before and/or after comments.
    'lines-around-comment': 'off',

    // This rule enforces a maximum depth that blocks can be nested to reduce
    // code complexity.
    'max-depth': ['warn', 4],

    // This rule enforces a maximum line length to increase code readability and
    // maintainability.
    'max-len': ['warn', 80, {
      ignoreComments: false,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreUrls: true,
    }],

    // This rule enforces a maximum number of lines per file, in order to aid in
    // maintainability and reduce complexity.
    'max-lines': ['warn', 700],

    // This rule enforces a maximum depth that callbacks can be nested to
    // increase code clarity.
    'max-nested-callbacks': 'off',

    // This rule enforces a maximum number of parameters allowed in function
    // definitions.
    'max-params': ['warn', 7],

    // This rule enforces a maximum number of statements allowed in function
    // blocks.
    'max-statements': 'off',

    // This rule enforces a maximum number of statements allowed per line.
    'max-statements-per-line': ['error', {max: 1}],

    // This rule aims to enforce a particular style for multiline comments.
    'multiline-comment-style': 'off',

    // This rule enforces or disallows newlines between operands of a ternary
    // expression.
    'multiline-ternary': 'off',

    // This rule requires constructor names to begin with a capital letter.
    // 'new-cap': 'error',
    'babel/new-cap': 'error',

    // This rule requires parentheses when invoking a constructor with no
    // arguments using the new keyword in order to increase code clarity.
    'new-parens': 'off',

    // This rule enforces a coding style where empty lines are required or
    // disallowed after “var”, “let”, or “const” statements to achieve a
    // consistent coding style across the project.
    'newline-after-var': 'off',

    // You can safely disable this rule if you do not have any strict
    // conventions about whitespace before return statements.
    'newline-before-return': 'off',

    // This rule requires a newline after each call in a method chain or deep
    // member access.
    'newline-per-chained-call': 'off',

    // This rule disallows Array constructors.
    'no-array-constructor': 'error',

    // This rule disallows bitwise operators.
    'no-bitwise': 'off',

    // This rule disallows “continue” statements.
    'no-continue': 'off',

    // This rule disallows comments on the same line as code.
    'no-inline-comments': 'off',

    // This rule disallows “if” statements as the only statement in “else”
    // blocks.
    'no-lonely-if': 'error',

    // This rule prevents multiple operators in the same expression.
    'no-mixed-operators': 'off',

    // This rule disallows mixed spaces and tabs for indentation.
    'no-mixed-spaces-and-tabs': 'error',

    // This rule disallows using multiple assignments within a single statement.
    'no-multi-assign': 'off',

    // This rule aims to reduce the scrolling required when reading through your
    // code. It will warn when the maximum amount of empty lines has been
    // exceeded.
    'no-multiple-empty-lines': ['error', {max: 1, maxEOF: 1}],

    // This rule disallows negated conditions in either of the following:
    //   * “if” statements which have an “else” branch.
    //   * Ternary expressions.
    'no-negated-condition': 'off',

    // This rule disallows nested ternary expressions.
    'no-nested-ternary': 'off',

    // This rule disallows object constructors.
    'no-new-object': 'error',

    // This rule disallows the unary operators “++” and “--”.
    'no-plusplus': 'off',

    // This rule disallows specified (that is, user-defined) syntax.
    'no-restricted-syntax': 'off',

    // This rule looks for tabs anywhere inside a file: code, comments or
    // anything else.
    'no-tabs': 'error',

    // This rule disallows ternary operators.
    'no-ternary': 'off',

    // This rule disallows trailing whitespace (spaces, tabs, and other Unicode
    // whitespace characters) at the end of lines.
    'no-trailing-spaces': 'error',

    // This rule disallows dangling underscores in identifiers.
    'no-underscore-dangle': 'off',

    // This rule disallow ternary operators when simpler alternatives exist.
    'no-unneeded-ternary': 'error',

    // This rule disallows whitespace around the dot or before the opening
    // bracket if they are on the same line.
    'no-whitespace-before-property': 'error',

    // This rule aims to enforce a consistent location for single-line
    // statements.
    'nonblock-statement-body-position': [
      'error', 'below', {
        overrides: {
          else: 'any',
          if: 'any',
        },
      },
    ],

    // This rule enforces consistent line breaks inside braces of object
    // literals or destructuring assignments.
    'object-curly-newline': ['error', {consistent: true}],

    // This rule enforce consistent spacing inside braces of object literals,
    // destructuring assignments, and import/export statements.
    // 'object-curly-spacing': ['error', 'never'],
    'babel/object-curly-spacing': ['error', 'never'],

    // This rule aims to maintain consistency of newlines between object
    // properties.
    'object-property-newline': ['error', {allowAllPropertiesOnSameLine: true}],

    // This rule enforces variables to be declared either together or separately
    // per function or block scope.
    'one-var': 'off',

    // This rule enforces a consistent newlines around variable declarations.
    'one-var-declaration-per-line': 'off',

    // This rule requires or disallows assignment operator shorthand where
    // possible.
    'operator-assignment': [
      'error',
      // Use shorthand where possible.
      'always',
    ],

    // This rule enforces a consistent line-break style for operators.
    'operator-linebreak': [
      'error',
      // Requires line-breaks to be placed before the operator.
      'before',
    ],

    // This rule enforces consistent empty line padding within blocks.
    'padded-blocks': ['error', 'never'],

    // This rule requires quotes around object literal property names.
    'quote-props': ['error', 'as-needed'],

    // This rule enforces the consistent use of either backticks, double, or
    // single quotes.
    // quotes: ['error', 'single'],
    'babel/quotes': ['error', 'single'],

    // This rule requires JSDoc comments for specified nodes.
    'require-jsdoc': 'off',

    // This rule enforces consistent use of semicolons.
    // semi: ['error', 'never'],
    'babel/semi': ['error', 'never'],

    // This rule aims to enforce spacing around a semicolon.
    'semi-spacing': 'off',

    // This rule reports line terminators around semicolons.
    'semi-style': 'off',

    // This rule checks all property definitions of object expressions and
    // verifies that all variables are sorted alphabetically.
    'sort-keys': 'off',

    // This rule checks all variable declaration blocks and verifies that all
    // variables are sorted alphabetically.
    'sort-vars': 'off',

    // This rule will enforce consistency of spacing before blocks. It is only
    // applied on blocks that don’t begin on a new line.
    'space-before-blocks': ['error', 'always'],

    // This rule aims to enforce consistent spacing before function parentheses.
    'space-before-function-paren': ['error', {
      anonymous: 'always',
      asyncArrow: 'always',
      named: 'never',
    }],

    // This rule will enforce consistency of spacing directly inside of
    // parentheses.
    'space-in-parens': ['error', 'never'],

    // This rule is aimed at ensuring there are spaces around infix operators.
    'space-infix-ops': 'error',

    // This rule enforces consistency regarding the spaces after words unary
    // operators and after/before non words unary operators.
    'space-unary-ops': ['error', {
      nonwords: false,
      words: true,
    }],

    // This rule will enforce consistency of spacing after the start of a
    // comment “//” or “/*”. It also provides several exceptions for various
    // documentation styles.
    'spaced-comment': ['error', 'always'],

    // This rule controls spacing around colons of case and default clauses in
    // switch statements. This rule does the check only if the consecutive
    // tokens exist on the same line.
    'switch-colon-spacing': 'error',

    // This rule aims to maintain consistency around the spacing between
    // template tag functions and their template literals.
    'template-tag-spacing': ['error', 'never'],

    // This rule will enforce consistency of the Unicode BOM in all files.
    'unicode-bom': ['error', 'never'],

    // Forces regex literals to be wrapped around parenthesis.
    'wrap-regex': 'off',
  },
}
