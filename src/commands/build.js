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

import {run} from "../util/tool"

function buildLib(args) {
  cleanup()
  run("babel", ["src", "-d", "build", "--ignore", "**/__*__/**", "-s"])
}

function buildNodeApp(args) {
  cleanup()
  run("babel", ["src", "-d", "build", "--ignore", "**/__*__/**", "-s"])
}

function buildWebApp(args) {
  cleanup()
  run("webpack", [])
}

function cleanup() {
  run("rimraf", ['"build/!(.git)"'])
}

export default {
  command: "build",
  description: "Build the project.",
  builder: yargs => {
    return yargs
      .command({
        command: "lib",
        description: "Build a library to be used in a node or web app.",
        handler: buildLib
      })
      .command({
        command: "node-app",
        description: "Build a node app.",
        handler: buildNodeApp
      })
      .command({
        command: "web-app",
        description: "Build a web app.",
        handler: buildWebApp
      })
      .demandCommand()
  }
}
