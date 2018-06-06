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

module.exports = {
  rules: {
    // https://github.com/yannickcr/eslint-plugin-react#list-of-supported-rules

    // Allows you to enforce a consistent naming pattern for props which expect
    // a boolean value.
    'react/boolean-prop-naming': 'off',

    // The default value of type attribute for button HTML element is “submit”
    // which is often not the desired behavior and may lead to unexpected page
    // reloads. This rules enforces an explicit type attribute for all the
    // button elements.
    'react/button-has-type': 'error',

    // This rule aims to ensure that any defaultProp has a non-required PropType
    // declaration.
    'react/default-props-match-prop-types': 'off',

    // Enforce consistent usage of destructuring assignment of props, state, and
    // context
    'react/destructuring-assignment': 'off',

    // DisplayName allows you to name your component. This name is used by React
    // in debugging messages.
    'react/display-name': 'off',

    // This rule only applies to Components and not DOM nodes. The list of
    // forbidden props can be customized with the forbid option.
    'react/forbid-component-props': 'off',

    // Forbid certain props on DOM Nodes.
    'react/forbid-dom-props': 'off',

    // You may want to forbid usage of certain elements in favor of others. This
    // rule allows you to configure a list of forbidden elements and to specify
    // their desired replacements.
    'react/forbid-elements': 'off',

    // By default this rule prevents vague prop types with more specific
    // alternatives available (any, array, object), but any prop type can be
    // disabled if desired.
    'react/forbid-prop-types': 'off',

    // This rule forbids using another component's prop types unless they are
    // explicitly imported/exported.
    'react/forbid-foreign-prop-types': 'off',

    // This rule should prevent usage of this.state inside “setState” calls.
    'react/no-access-state-in-setstate': 'error',

    // Warn if an element uses an Array index in its key.
    'react/no-array-index-key': 'off',

    // Children should always be actual children, not passed in as a prop.
    'react/no-children-prop': 'off',

    // Dangerous properties in React are those whose behavior is known to be a
    // common source of application vulnerabilities. The properties names
    // clearly indicate they are dangerous and should be avoided unless great
    // care is taken.
    'react/no-danger': 'off',

    // This rule helps prevent problems caused by using children and the
    // “dangerouslySetInnerHTML” property at the same time. React will throw a
    // warning if this rule is ignored.
    'react/no-danger-with-children': 'error',

    // Several methods are deprecated between React versions. This rule will
    // warn you if you try to use a deprecated method. Use the shared settings
    // to specify the React version.
    'react/no-deprecated': 'error',

    // Updating the state after a component mount will trigger a second
    // “render()” call and can lead to property/layout thrashing.
    'react/no-did-mount-set-state': 'warn',

    // Updating the state after a component update will trigger a second
    // “render()” call and can lead to property/layout thrashing.
    'react/no-did-update-set-state': 'warn',

    // NEVER mutate “this.state” directly, as calling “setState()” afterwards
    // may replace the mutation you made. Treat “this.state” as if it were
    // immutable.
    'react/no-direct-mutation-state': 'error',

    // Facebook will eventually deprecate findDOMNode as it blocks certain
    // improvements in React in the future. It is recommended to use callback
    // refs instead.
    'react/no-find-dom-node': 'error',

    // “isMounted” is an anti-pattern, is not available when using ES6 classes,
    // and it is on its way to being officially deprecated.
    'react/no-is-mounted': 'error',

    // Declaring only one component per file improves readability and
    // reusability of components.
    'react/no-multi-comp': 'off',

    // Warns if you have shouldComponentUpdate defined when defining a component
    // that extends “React.PureComponent”.
    'react/no-redundant-should-component-update': 'error',

    // This rule will warn you if you try to use the “ReactDOM.render()” return
    // value.
    'react/no-render-return-value': 'error',

    // When using an architecture that separates your application state from
    // your UI components (e.g. Flux), it may be desirable to forbid the use of
    // local component state. This rule is especially helpful in read-only
    // applications (that don’t use forms), since local component state should
    // rarely be necessary in such cases.
    'react/no-set-state': 'off',

    // Currently, two ways are supported by React to refer to components. The
    // first way, providing a string identifier, is now considered legacy in the
    // official documentation. The documentation now prefers a second method,
    // referring to components by setting a property on the this object in the
    // reference callback.
    'react/no-string-refs': 'error',

    // When using a stateless functional component (SFC), props/context aren’t
    // accessed in the same way as a class component.
    'react/no-this-in-sfc': 'error',

    // Ensure no casing typos were made declaring static class properties and
    // lifecycle methods.
    'react/no-typos': 'error',

    // This rule prevents characters that you may have meant as JSX escape
    // characters from being accidentally injected as a text node in JSX
    // statements.
    'react/no-unescaped-entities': 'off',

    // In JSX all DOM properties and attributes should be camelCased to be
    // consistent with standard JavaScript style. This can be a possible source
    // of error if you are used to writing plain HTML.
    'react/no-unknown-property': 'error',

    // Warns you if you have defined a prop type but it is never being used
    // anywhere.
    'react/no-unused-prop-types': 'warn',

    // Warns you if you have defined a property on the state, but it is not
    // being used anywhere.
    'react/no-unused-state': 'warn',

    // Updating the state during the “componentWillUpdate” step can lead to
    // indeterminate component state and is not allowed.
    'react/no-will-update-set-state': 'error',

    // React offers you two way to create traditional components: using the ES5
    // “create-react-class” module or the new ES6 class system. This rule allow
    // you to enforce one way or another.
    'react/prefer-es6-class': 'error',

    // Stateless functional components are simpler than class based components
    // and will benefit from future React performance optimizations specific to
    // these components.
    'react/prefer-stateless-function': 'off',

    // It can warn other developers if they make a mistake while reusing the
    // component with improper data type.
    'react/prop-types': 'off',

    // When using JSX, “<a/>” expands to “React.createElement("a")”. Therefore
    // the React variable must be in scope.
    'react/react-in-jsx-scope': 'error',

    // This rule aims to ensure that any non-required PropType declaration of a
    // component has a corresponding defaultProps value.
    'react/require-default-props': 'off',

    // This rule prevents you from creating React components without declaring a
    // “shouldComponentUpdate” method.
    'react/require-optimization': 'off',

    // When writing the render method in a component it is easy to forget to
    // return the JSX content. This rule will warn if the return statement is
    // missing.
    'react/require-render-return': 'error',

    // Components without children can be self-closed to avoid unnecessary extra
    // closing tag.
    'react/self-closing-comp': 'error',

    // When creating React components it is more convenient to always follow the
    // same organization for methods order to helps you to easily find lifecycle
    // methods, event handlers, etc.
    'react/sort-comp': 'off',

    // Some developers prefer to sort propTypes declarations alphabetically to
    // be able to find necessary declaration easier at the later time.
    'react/sort-prop-types': 'off',

    // Require that the value of the property style be an object or a variable
    // that is an object.
    'react/style-prop-object': 'off',

    // Prevent void DOM elements (e.g., “<img/>”, “<br/>”) from receiving
    // children
    'react/void-dom-elements-no-children': 'error',

    // https://github.com/yannickcr/eslint-plugin-react#jsx-specific-rules

    // When using a boolean attribute in JSX, you can set the attribute value to
    // true or omit the value. This rule will enforce one or the other to keep
    // consistency in your code.
    'react/jsx-boolean-value': ['error', 'never'],

    // Since React removes extraneous new lines between elements when possible,
    // it is possible to end up with inline elements that are not rendered with
    // spaces between them and adjacent text.
    'react/jsx-child-element-spacing': 'off',

    // Enforce the closing bracket location for JSX multiline elements.
    'react/jsx-closing-bracket-location': ['error', 'tag-aligned'],

    // Enforce the closing tag location for multiline JSX elements.
    'react/jsx-closing-tag-location': 'error',

    // Enforce curly braces or disallow unnecessary curly braces in JSX props
    // and/or children.
    'react/jsx-curly-brace-presence': 'off',

    // This rule aims to maintain consistency around the spacing inside of JSX
    // attributes and expressions inside element children.
    'react/jsx-curly-spacing': ['error', 'never'],

    // Some style guides require or disallow spaces around equal signs.
    'react/jsx-equals-spacing': ['error', 'never'],

    // Restrict file extensions that may contain JSX.
    'react/jsx-filename-extension': ['error', {extensions: ['.js']}],

    // Configure the position of the first property.
    'react/jsx-first-prop-new-line': ['error', 'multiline-multiprop'],

    // Ensures that any component or prop methods used to handle events are
    // correctly prefixed.
    'react/jsx-handler-names': 'off',

    // This option validates a specific indentation style for JSX.
    'react/jsx-indent': ['error', 2],

    // This option validates a specific indentation style for props.
    'react/jsx-indent-props': ['error', 2],

    // Warn if an element that likely requires a key property.
    'react/jsx-key': 'warn',

    // This option validates a specific depth for JSX.
    'react/jsx-max-depth': 'off',

    // Limiting the maximum of props on a single line can improve readability.
    'react/jsx-max-props-per-line': 'off',

    // A bind call or arrow function in a JSX prop will create a brand new
    // function on every single render.
    'react/jsx-no-bind': 'warn',

    // Prevent comments from being inserted as text nodes.
    'react/jsx-no-comment-textnodes': 'off',

    // Prevent duplicate properties in JSX.
    'react/jsx-no-duplicate-props': 'error',

    // This rules requires that you wrap all literal strings. Prevents any odd
    // artifacts of highlighters if your unwrapped string contains an enclosing
    // character like ' in contractions and enforces consistency.
    'react/jsx-no-literals': 'off',

    // Prevent usage of unsafe “target='_blank'”.
    'react/jsx-no-target-blank': 'off',

    // This rule helps locate potential ReferenceErrors resulting from
    // misspellings or missing components.
    'react/jsx-no-undef': 'error',

    // This option limits every line in JSX to one expression each.
    'react/jsx-one-expression-per-line': 'error',

    // Enforce PascalCase for user-defined JSX components.
    'react/jsx-pascal-case': 'error',

    // Enforces that there is exactly one space between two JSX attributes or
    // the JSX tag name and the first JSX attribute in the same line.
    'react/jsx-props-no-multi-spaces': 'error',

    // Some developers prefer to sort defaultProps declarations alphabetically
    // to be able to find necessary declarations easier at a later time. Others
    // feel that it adds complexity and becomes a burden to maintain.
    'react/jsx-sort-default-props': 'off',

    // Enforce props alphabetical sorting.
    'react/jsx-sort-props': 'off',

    // Validate whitespace in and around the JSX opening and closing brackets.
    'react/jsx-tag-spacing': ['error', {
      afterOpening: 'never',
      beforeSelfClosing: 'never',
      closingSlash: 'never',
    }],

    // Prevent React to be incorrectly marked as unused.
    'react/jsx-uses-react': 'error',

    // Prevent variables used in JSX to be incorrectly marked as unused.
    'react/jsx-uses-vars': 'error',

    // Prevent missing parentheses around multiline JSX.
    'react/jsx-wrap-multilines': 'error',
  },
}
