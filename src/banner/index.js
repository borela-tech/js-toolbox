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

import {join} from 'path'
import {readFileSync} from 'fs'

const EPILOG_PATH = join(__dirname, 'epilog.txt')
const PROLOG_PATH = join(__dirname, 'prolog.txt')

function trimLastLine(target) {
  return target.replace(/\n$/, '')
}

export function getEpilog() {
  return readFileSync(EPILOG_PATH, 'UTF-8')
    |> trimLastLine
}

export function getProlog(version) {
  const PROLOG = readFileSync(PROLOG_PATH, 'UTF-8')
  const [PLACEHOLDER] = PROLOG.match(/#*version/)

  const PADDED_VERSION = `v${version}`
    .padStart(PLACEHOLDER.length)

  return PROLOG.replace(PLACEHOLDER, PADDED_VERSION)
    |> trimLastLine
}
