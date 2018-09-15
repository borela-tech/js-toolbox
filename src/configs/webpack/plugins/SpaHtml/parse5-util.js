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

import {html as beautifyHtml} from 'js-beautify'
import {minify as minifyHtml} from 'html-minifier'
import {serialize} from 'parse5'

// We pass the serialized HTML through the minifier to remove any
// unnecessary whitespace that could affect the beautifier. When we are
// actually trying to minify, comments will be removed too. Options can be
// found in:
//
//     https://github.com/kangax/html-minifier
//
const SHARED_MINIFIER_OPTIONS = {
  caseSensitive: false,
  collapseBooleanAttributes: true,
  collapseInlineTagWhitespace: true,
  collapseWhitespace: true,
  conservativeCollapse: false,
  decodeEntities: true,
  html5: true,
  includeAutoGeneratedTags: false,
  keepClosingSlash: false,
  preserveLineBreaks: false,
  preventAttributesEscaping: true,
  processConditionalComments: false,
  quoteCharacter: '"',
  removeAttributeQuotes: true,
  removeEmptyAttributes: true,
  removeEmptyElements: false,
  removeOptionalTags: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  sortAttributes: true,
  sortClassName: true,
  useShortDoctype: true,
}

/**
 * Extract an attribute’s value from the node; Returns undefined if the
 * attribute is not found.
 */
export function getAttributeValue(node, attributeName) {
  for (let attribute of node.attrs) {
    if (attribute.name === attributeName)
      return attribute.value
  }
  return undefined
}

/**
 * Returns a resource request.
 */
export function getResourceRequest(node) {
  let {tagName} = node
  if (!tagName)
    return undefined

  switch (tagName) {
    case 'link':
      return getAttributeValue(node, 'href')
    case 'img':
      return getAttributeValue(node, 'src')
  }

  return undefined
}

/**
 * Returns a formatted HTML string.
 */
export function minifiedHtmlString(tree) {
  let serialized = serialize(tree)
  return minifyHtml(serialized, {
    minifyCSS: true,
    minifyJS: true,
    removeComments: true,
    ...SHARED_MINIFIER_OPTIONS,
  })
}

/**
 * Returns a formatted HTML string.
 */
export function prettifiedHtmlString(tree) {
  let serialized = serialize(tree)
  serialized = minifyHtml(serialized, SHARED_MINIFIER_OPTIONS)
  return beautifyHtml(serialized, {
    indent_char: ' ',
    indent_inner_html: true,
    indent_size: 2,
    sep: '\n',
    unformatted: ['code', 'pre'],
  })
}

/**
 * Update a node’s attribute value.
 */
export function setAttributeValue(node, attributeName, value) {
  for (let attribute of node.attrs) {
    if (attribute.name === attributeName)
      attribute.value = value
  }
}

/**
 * Change the resource request.
 */
export function setResourceRequest(node, newRequest) {
  let {tagName} = node
  if (!tagName)
    return undefined

  switch (tagName) {
    case 'link':
      setAttributeValue(node, 'href', newRequest)
      break
    case 'img':
      setAttributeValue(node, 'src', newRequest)
      break
  }
}

/**
 * Recursively walks the parsed tree. It should work in 99.9% of the cases but
 * it needs to be replaced with a non recursive version.
 */
export function * walk(node) {
  yield node

  if (!node.childNodes)
    return

  for (let child of node.childNodes)
    yield * walk(child)
}
