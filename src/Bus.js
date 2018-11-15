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

/**
 * Generic communication bus.
 */
export default class Bus {
  listeners = {
    // Listeners for all events.
    all: [],

    // Listeners for specific events.
    specific: {},
  }

  publish(event) {
    let {all, specific} = this.listeners

    for (let listener of all)
      listener(event)

    specific = specific[event.type]

    if (!specific)
      return

    for (let listener of specific)
      listener(event)
  }

  subscribe(arg) {
    if (typeof arg === 'function')
      return this._subscribe({listener: arg})
    return this._subscribe(arg)
  }

  _subscribe({type, listener}) {
    let {all, specific} = this.listeners

    if (!type) {
      all.push(listener)
      return
    }

    specific = specific[type] ??= []
    specific.push(listener)
  }
}
