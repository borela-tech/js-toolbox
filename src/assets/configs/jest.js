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

import {TARGET_PACKAGE_DIR, TOOLBOX_DIR} from "../../util/paths"
console.log(TARGET_PACKAGE_DIR)
module.exports = {
  rootDir: TARGET_PACKAGE_DIR
  // setupFiles: [TOOLBOX_DIR + '/node_modules/raf/polyfill'],
  // snapshotSerializers: [TOOLBOX_DIR + "/node_modules/enzyme-to-json/serializer"],
  // testMatch: ["<rootDir>/**/__tests__/**/*.js"],
  // testPathIgnorePatterns: ["<rootDir>/build", "<rootDir>/node_modules/"]
}
