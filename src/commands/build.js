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

export default {
  command: "build",
  description: "Build the project",
  builder: yargs => {
    return yargs
      .command({
        command: "cli-app",
        description: "Build the CLI app"
      })
      .command({
        command: "node-app",
        description: "Build the node app"
      })
      .command({
        command: "web-app",
        description: "Build the web app"
      })
  },
  handler: args => {
    console.log("Build command executed.")
  }
}
