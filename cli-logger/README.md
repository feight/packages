# @newsteam/cli-logger

[![License](https://img.shields.io/npm/l/@newsteam/cli-logger.svg)](https://github.com/feight/packages/blob/master/LICENSE)
[![npm package](https://img.shields.io/npm/v/@newsteam/cli-logger/latest.svg)](https://www.npmjs.com/package/@newsteam/cli-logger)
[![npm downloads](https://img.shields.io/npm/dm/@newsteam/cli-logger.svg)](https://www.npmjs.com/package/@newsteam/cli-logger)
[![Dependencies](https://img.shields.io/david/feight/packages.svg?path=packages%2Flogger)](https://david-dm.org/feight/packages?path=packages/logger)
[![DevDependencies](https://img.shields.io/david/feight/packages.svg?path=packages%2Flogger)](https://david-dm.org/feight/packages?type=dev&path=packages/logger)

This package provides a logger for command line interfaces.

## Install

```
$ npm install logger
```
## Simple usage

```js
import { logger } from "@newsteam/cli-logger";

logger.log(label, message);

```
## Customized usage

```js
import { Logger } from "@newsteam/cli-logger";

const logger = new Logger();

logger.log(label, message);

```
## Maintenance

You can run tests with `npm test`.
