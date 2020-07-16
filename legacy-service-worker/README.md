# @newsteam/legacy-service-worker

[![License](https://img.shields.io/npm/l/@newsteam/legacy-service-worker.svg)](https://github.com/feight/packages/blob/master/LICENSE)
[![npm package](https://img.shields.io/npm/v/@newsteam/legacy-service-worker/latest.svg)](https://www.npmjs.com/package/@newsteam/legacy-service-worker)
[![npm downloads](https://img.shields.io/npm/dm/@newsteam/legacy-service-worker.svg)](https://www.npmjs.com/package/@newsteam/legacy-service-worker)
[![Dependencies](https://img.shields.io/david/feight/packages.svg?path=packages%2Futils)](https://david-dm.org/feight/packages?path=legacy-service-worker)
[![DevDependencies](https://img.shields.io/david/feight/packages.svg?path=packages%2Futils)](https://david-dm.org/feight/packages?type=dev&path=legacy-service-worker)

Exports a ServiceWorker class that can be used to automatically configure a server worker for the Assemble framework.

## Install

```
$ npm install @newsteam/legacy-service-worker
```
## Simple usage

```js
import { ServiceWorker } from "@newsteam/legacy-service-worker";


const serviceWorker = new ServiceWorker();

serviceWorker.start();

```
## Maintenance

You can run tests with `npm test`.
