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

import pkgDir from "pkg-dir"
import {join} from "path"

export const TARGET_PACKAGE_DIR = pkgDir.sync()
export const TARGET_PACKAGE_BIN_DIR = join(
  TARGET_PACKAGE_DIR,
  "node_modules",
  ".bin"
)

export const TOOLBOX_DIR = join(__dirname, "..", "..")
export const TOOLBOX_BIN_DIR = join(TOOLBOX_DIR, "node_modules", ".bin")

export const ASSETS_DIR = join(TOOLBOX_DIR, "build/assets")
export const CONFIGS_DIR = join(ASSETS_DIR, "configs")
export const TEMPLATES_DIR = join(ASSETS_DIR, "templates")
