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

let nodeExternals = require("webpack-node-externals")
let { resolve } = require("path")

module.exports = {
  devtool: "source-map",
  externals: nodeExternals({
    whitelist: [
      "@babel/polyfill",
      // "core-js/fn/regexp/escape",
      "core-js/shim",
      "regenerator-runtime/runtime"
    ]
  }),
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js$/,
        use: [
          { loader: "babel-loader" },
          { loader: "source-map-loader" }
        ]
      }
    ]
  },
  output: {
    path: resolve(__dirname, "build")
  },
  target: "node"
}
