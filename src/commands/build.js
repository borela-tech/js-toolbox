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

import {CONFIGS_DIR} from "../paths"
import {join} from "path"
import {runBinary} from "../binaries"

const PRESET_LOCATION = join(CONFIGS_DIR, "babel-preset", "index.js")
const BABEL_ARGS = [
  "src",
  "-d",
  "build",
  "--ignore",
  "**/__*__/**",
  "-s",
  `--presets=${PRESET_LOCATION}`
]

function buildLib(args) {
  cleanup()
  runBinary("babel", BABEL_ARGS, {
    target: "both",
    ...getBuildOptions(args)
  })
}

function buildNodeApp(args) {
  cleanup()
  runBinary("babel", BABEL_ARGS, {
    target: "node",
    ...getBuildOptions(args)
  })
}

function buildNodeLib(args) {
  cleanup()
  runBinary("babel", BABEL_ARGS, {
    target: "node",
    ...getBuildOptions(args)
  })
}

function buildWebApp(args) {
  console.log("TODO")
}

function buildWebLib(args) {
  cleanup()
  runBinary("babel", BABEL_ARGS, {
    target: "web",
    ...getBuildOptions(args)
  })
}

function cleanup() {
  runBinary("rimraf", ['"build"'])
}

/**
 * Returns the options affects which plugins are enabled.
 */
function getBuildOptions(args) {
  return {
    commentFlow: args.commentFlow,
    react: args.react,
    removeFlow: args.removeFlow,
    typescript: args.typescript
  }
}

export default {
  command: "build",
  description: "Build the project.",
  builder: yargs => {
    return yargs
      .command({
        command: "lib",
        description: "Build a library to be used on node or web app.",
        handler: buildLib
      })
      .command({
        command: "node-app",
        description: "Build a node app.",
        handler: buildNodeApp
      })
      .command({
        command: "node-lib",
        description: "Build a library to be used on node apps.",
        handler: buildNodeLib
      })
      .command({
        command: "web-app",
        description: "Build a web app.",
        handler: buildWebApp
      })
      .command({
        command: "web-lib",
        description: "Build a library to be used on web apps.",
        handler: buildWebLib
      })
      .demandCommand()
  }
}
