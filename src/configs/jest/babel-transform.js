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

import babelJest from "babel-jest"
import {findModule} from "../../modules"
import {TARGET_PACKAGE_DIR, TOOLBOX_DIR} from "../../paths"

module.exports = babelJest.createTransformer({
  plugins: [
    // Transforms that break if the order is changed.
    findModule("@babel/plugin-transform-flow-comments"),
    [findModule("@babel/plugin-proposal-decorators"), {legacy: true}],
    // Other transforms.
    findModule("@babel/plugin-proposal-async-generator-functions"),
    findModule("@babel/plugin-proposal-class-properties"),
    findModule("@babel/plugin-proposal-do-expressions"),
    findModule("@babel/plugin-proposal-export-default-from"),
    findModule("@babel/plugin-proposal-export-namespace-from"),
    findModule("@babel/plugin-proposal-function-bind"),
    findModule("@babel/plugin-proposal-function-sent"),
    findModule("@babel/plugin-proposal-logical-assignment-operators"),
    findModule("@babel/plugin-proposal-nullish-coalescing-operator"),
    findModule("@babel/plugin-proposal-numeric-separator"),
    findModule("@babel/plugin-proposal-object-rest-spread"),
    findModule("@babel/plugin-proposal-optional-catch-binding"),
    findModule("@babel/plugin-proposal-optional-chaining"),
    findModule("@babel/plugin-proposal-pipeline-operator"),
    findModule("@babel/plugin-proposal-throw-expressions"),
    findModule("@babel/plugin-proposal-unicode-property-regex")
  ],
  presets: [[findModule("@babel/preset-env"), {targets: {node: 6}}]]
})
