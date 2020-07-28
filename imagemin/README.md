# @newsteam/imagemin

[![License](https://img.shields.io/npm/l/@newsteam/imagemin.svg)](https://github.com/feight/packages/blob/master/LICENSE)
[![npm package](https://img.shields.io/npm/v/@newsteam/imagemin/latest.svg)](https://www.npmjs.com/package/@newsteam/imagemin)
[![npm downloads](https://img.shields.io/npm/dm/@newsteam/imagemin.svg)](https://www.npmjs.com/package/@newsteam/imagemin)
[![Dependencies](https://img.shields.io/david/feight/packages.svg?path=imagemin)](https://david-dm.org/feight/packages?path=imagemin)
[![DevDependencies](https://img.shields.io/david/feight/packages.svg?path=imagemin)](https://david-dm.org/feight/packages?type=dev&path=imagemin)

This package provides a shared config for imagemin and several of its plugins.

## Install

```
$ npm install imagemin
```
## Usage

```js
import imagemin from "@newsteam/imagemin";

(async () => {

  const files = await imagemin(['images/*.{jpg,png}'], 'build/images');

  console.log(files);
  //=> [{data: <Buffer 89 50 4e ...>, path: 'build/images/foo.jpg'}, ...]

})();
```

## API

### imagemin(input, [output], [options])

Returns `Promise<Object[]>` in the format `{data: Buffer, path: string}`.

#### input

Type: `string[]`

Files to be optimized. See supported `minimatch` [patterns](https://github.com/isaacs/minimatch#usage).

#### output

Type: `string`

## Maintenance

You can run tests with `npm test`.
