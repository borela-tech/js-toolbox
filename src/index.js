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

import Yargs from "yargs"

Yargs.help()
  .command("build", "Build the project", yargs => {})
  .command("generate", "Generate project skeleton", yargs => {})
  .command("lint", "Checks or apply prettier to the project", yargs => {})
  .command("test", "Run test suites", yargs => {})
  .parse()
