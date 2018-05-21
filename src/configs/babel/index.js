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

import basicNodePreset from "./target/node"
import basicPreset from "./target/both"
import basicWebPreset from "./target/web"
import {findModule} from "../../modules"

let {flow, react, target, typescript} = process.env
let result = basicPreset()

if (target === "node") result = basicNodePreset()
if (target === "web") result = basicWebPreset()

if (flow) {
  result.plugins.unshift(findModule("@babel/plugin-transform-flow-comments"))
}

if (react) {
  result.presets.push(findModule("@babel/preset-react"))
}

if (typescript) {
  result.presets.push(findModule("@babel/preset-typescript"))
}

module.exports = result
