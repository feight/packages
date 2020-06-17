# @newsteam/stylelint-config

[![License](https://img.shields.io/npm/l/@newsteam/stylelint-config.svg)](https://github.com/feight/packages/blob/master/LICENSE)
[![npm package](https://img.shields.io/npm/v/@newsteam/stylelint-config/latest.svg)](https://www.npmjs.com/package/@newsteam/stylelint-config)
[![npm downloads](https://img.shields.io/npm/dm/@newsteam/stylelint-config.svg)](https://www.npmjs.com/package/@newsteam/stylelint-config)
[![Dependencies](https://img.shields.io/david/feight/packages.svg?path=stylelint-config)](https://david-dm.org/feight/packages?path=stylelint-config)
[![DevDependencies](https://img.shields.io/david/feight/packages.svg?path=stylelint-config)](https://david-dm.org/feight/packages?type=dev&path=stylelint-config)

This package provides a shared config for stylelint and several of its plugins.

## Usage

A single stylelint configuration is exported.

Our default export contains all of our stylelint rules. It requires the following peer dependencies:

```
    stylelint
    stylelint-order
    stylelint-scss
```

### Installation

1. Install the shared configuration:

  ```sh
  npm install --save-dev @newsteam/stylelint-config
  ```

2. Install the shared configuration peer dependencies (npm 5+):

  ```sh
  npx install-peerdeps --dev @newsteam/stylelint-config
  ```

3. Add `"extends": "@newsteam/stylelint-config"` to your .stylelintrc.

## Maintenance

You can run tests with `npm test`.
