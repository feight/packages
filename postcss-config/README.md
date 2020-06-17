# @newsteam/postcss-config

[![License](https://img.shields.io/npm/l/@newsteam/postcss-config.svg)](https://github.com/feight/packages/blob/master/LICENSE)
[![npm package](https://img.shields.io/npm/v/@newsteam/postcss-config/latest.svg)](https://www.npmjs.com/package/@newsteam/postcss-config)
[![npm downloads](https://img.shields.io/npm/dm/@newsteam/postcss-config.svg)](https://www.npmjs.com/package/@newsteam/postcss-config)
[![Dependencies](https://img.shields.io/david/feight/packages.svg?path=postcss-config)](https://david-dm.org/feight/packages?path=postcss-config)
[![DevDependencies](https://img.shields.io/david/feight/packages.svg?path=postcss-config)](https://david-dm.org/feight/packages?type=dev&path=postcss-config)

This package provides a shared config for postcss and several of its plugins.

## Usage

A single postcss configuration is exported.

Our default export contains all of our postcss plugins.

### Installation

1. Install the shared configuration:

  ```sh
  npm install --save-dev @newsteam/postcss-config
  ```

2. Add to your postcss.config.js.
  ```js
  const config = require("@newsteam/postcss-config");

  module.exports = config;
  ```

## Maintenance

You can run tests with `npm test`.
