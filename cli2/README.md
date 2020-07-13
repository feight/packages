@newsteam/cli
=============

Newsteam command line tools

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@newsteam/cli.svg)](https://npmjs.org/package/@newsteam/cli)
[![Downloads/week](https://img.shields.io/npm/dw/@newsteam/cli.svg)](https://npmjs.org/package/@newsteam/cli)
[![License](https://img.shields.io/npm/l/@newsteam/cli.svg)](https://github.com/feight/packages/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @newsteam/cli2
$ newsteam2 COMMAND
running command...
$ newsteam2 (-v|--version|version)
@newsteam/cli2/0.0.0 darwin-x64 node-v12.16.2
$ newsteam2 --help [COMMAND]
USAGE
  $ newsteam2 COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`newsteam2 hello [FILE]`](#newsteam2-hello-file)
* [`newsteam2 help [COMMAND]`](#newsteam2-help-command)
* [`newsteam2 legacy:test [PATH]`](#newsteam2-legacytest-path)

## `newsteam2 hello [FILE]`

describe the command here

```
USAGE
  $ newsteam2 hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ newsteam hello
       hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/feight/packages/blob/v0.0.0/src/commands/hello.ts)_

## `newsteam2 help [COMMAND]`

display help for newsteam2

```
USAGE
  $ newsteam2 help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.1.0/src/commands/help.ts)_

## `newsteam2 legacy:test [PATH]`

describe the command here

```
USAGE
  $ newsteam2 legacy:test [PATH]

ARGUMENTS
  PATH  [default: /Users/sweetlikepete/code/newsteam/packages/cli2] path

OPTIONS
  -a, --all
  -f, --fix                                          run autofix on lints
  -h, --help                                         show CLI help
  -t, --type=(all|eslint|flake8|htmllint|stylelint)  [default: all] specify which lint type to run

EXAMPLE
  $ newsteam legacy:test
```

_See code: [src/commands/legacy/test.ts](https://github.com/feight/packages/blob/v0.0.0/src/commands/legacy/test.ts)_
<!-- commandsstop -->
