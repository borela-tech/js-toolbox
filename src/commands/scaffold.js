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
  command: 'scaffold',
  description: 'Generate a project from the available templates.',
  builder: yargs => yargs
    .command({
      command: 'node-app',
      description: 'Generate a project to build a node app.',
    })
    .command({
      command: 'node-cli',
      description: 'Generate a project to build a CLI app.',
    })
    .command({
      command: 'web-app',
      description: 'Generate a project to build a web app.',
    })
    .demandCommand(),
  handler: env => {
    // TODO
  },
}
