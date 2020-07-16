# @newsteam/legacy-cli-logger

[![License](https://img.shields.io/npm/l/@newsteam/legacy-cli-logger.svg)](https://github.com/feight/packages/blob/master/LICENSE)
[![npm package](https://img.shields.io/npm/v/@newsteam/legacy-cli-logger/latest.svg)](https://www.npmjs.com/package/@newsteam/legacy-cli-logger)
[![npm downloads](https://img.shields.io/npm/dm/@newsteam/legacy-cli-logger.svg)](https://www.npmjs.com/package/@newsteam/legacy-cli-logger)
[![Dependencies](https://img.shields.io/david/feight/packages.svg?path=packages%2Flegacy-cli-logger)](https://david-dm.org/feight/packages?path=legacy-cli-logger)
[![DevDependencies](https://img.shields.io/david/feight/packages.svg?path=packages%2Flegacy-cli-logger)](https://david-dm.org/feight/packages?type=dev&path=legacy-cli-logger)

This package provides a logger for command line interfaces.

## Install

```
$ npm install @newsteam/legacy-cli-logger
```
## Simple usage

```js
import { logger } from "@newsteam/legacy-cli-logger";

logger.log(label, message);

```
## Customized usage

```js
import { Logger } from "@newsteam/legacy-cli-logger";

const logger = new Logger();

logger.log(label, message);

```
## Maintenance

You can run tests with `npm test`.
