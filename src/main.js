#!/usr/bin/env node

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

import EVENT_BUS from './event-bus'
import packageInfo from '../package'
import STORE from './state'
import Yargs from 'yargs'
import {getEpilog, getProlog} from './banner'
import {setUpUi} from './ui'

import build from './commands/build'
import lint from './commands/lint'
import location from './commands/location'
import scaffold from './commands/scaffold'
import serve from './commands/serve'
import start from './commands/start'
import test from './commands/test'

setUpUi(STORE, EVENT_BUS)

const VERSION = packageInfo.version
const PROLOG = getProlog(VERSION)
const EPILOG = getEpilog()

const PARSER = Yargs.scriptName('bb')
  .usage(PROLOG)
  .epilog(EPILOG)
  .strict()
  .help('help', 'Show usage instructions.')
  .version('version', 'Show toolbox version.', VERSION)
  .command(build)
  .command(lint)
  .command(location)
  .command(scaffold)
  .command(serve)
  .command(start)
  .command(test)
  .demandCommand(1, 'Error: Use one of the commands available.')
  .recommendCommands()

PARSER.parse()
