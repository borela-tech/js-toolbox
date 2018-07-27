[![Borela JS Toolbox](rebrand/art/logo.png)][toolbox]

[![GitHub watchers](https://img.shields.io/github/watchers/borela-tech/toolbox.svg?style=social)][watchers]
[![GitHub stars](https://img.shields.io/github/stars/borela-tech/toolbox.svg?style=social)][stars]
[![GitHub issues](https://img.shields.io/github/issues/borela-tech/toolbox.svg?style=social)][issues]
[![GitHub pulls](https://img.shields.io/github/issues-pr/borela-tech/toolbox.svg?style=social)][pulls]
[![GitHub forks](https://img.shields.io/github/forks/borela-tech/toolbox.svg?style=social)][forks]

CLI tool to simplify the development of JavaScript apps/libraries with little to
no configuration.

## Table of contents

1. [What’s included](#whats-included)
2. [Installation](#installation)
3. [Commands](#commands)
4. [Examples](#examples)

## What’s included

* All [Babel’s experimental plugins][experimental-plugins] are enabled by
  default;
* Polyfills are included based on the browsers and minimum NodeJS version
  supported by your project;
* This tool can be installed globally and used to compile any project that
  follows the expected directory structure;
* Your project will have little to no development dependencies;

Some features must be enabled explicitly either through command flags or
configuration:

* [Flow][flow];
* [React][react];
* [JSX][jsx];
* [TypeScript][typescript];

## Installation

```sh
npm install @borela-tech/toolbox -g
```

## Commands

`bb build`

Compile the files using [Babel][babel] and put them in the build directory. If
the project type requires bundling, [Webpack][webpack] will be used.

`bb scaffold <template> [destination]`

Copy the template files to the current folder or the destination specified.

`bb lint`

Run [ESLint][eslint] on the sources and tests separately to make sure that
[Jest’s globals][jest-globals] only affect the tests.

`bb test`

Run [Jest][jest].

## Examples

You can find example projects in the [templates directory](templates).

[forks]: //github.com/borela-tech/toolbox/network/members
[issues]: //github.com/borela-tech/toolbox/issues
[pulls]: //github.com/borela-tech/toolbox/pulls
[stars]: //github.com/borela-tech/toolbox/stargazers
[toolbox]: //github.com/borela-tech/toolbox
[watchers]: //github.com/borela-tech/toolbox/watchers

[eslint]: //eslint.org
[flow]: //flow.org
[jest]: //jestjs.io
[jsx]: //facebook.github.io/jsx/
[react]: //reactjs.org
[typescript]: //www.typescriptlang.org
[webpack]: //webpack.js.org

[experimental-plugins]: //babeljs.io/docs/en/plugins#experimental
[jest-globals]: //jestjs.io/docs/en/api
[preset-env]: //babeljs.io/docs/en/next/babel-preset-env.html
