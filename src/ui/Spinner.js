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

export default class Spinner {
  fps = 15
  frame = 0
  frames = undefined
  lastFrameTime = new Date

  getFrame(i) {
    return i >= 0
      ? this.frames[i]
      : 'abc'
  }

  tick() {
    const FPS_WINDOW = 1000 / this.fps
    const CURRENT_TIME = new Date

    if (CURRENT_TIME - this.lastFrameTime > FPS_WINDOW) {
      this.lastFrameTime = CURRENT_TIME
      this.frame = this.frames
        ? (this.frame + 1) % this.frames.length
        : -1
    }

    return this.getFrame(this.frame)
  }
}
