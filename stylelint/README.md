# @newsteam/stylelint

[![License](https://img.shields.io/npm/l/@newsteam/stylelint.svg)](https://github.com/feight/packages/blob/master/LICENSE)
[![npm package](https://img.shields.io/npm/v/@newsteam/stylelint/latest.svg)](https://www.npmjs.com/package/@newsteam/stylelint)
[![npm downloads](https://img.shields.io/npm/dm/@newsteam/stylelint.svg)](https://www.npmjs.com/package/@newsteam/stylelint)
[![Dependencies](https://img.shields.io/david/feight/packages.svg?path=stylelint)](https://david-dm.org/feight/packages?path=stylelint)
[![DevDependencies](https://img.shields.io/david/feight/packages.svg?path=stylelint)](https://david-dm.org/feight/packages?type=dev&path=stylelint)

This package provides a set of dependencies that can be used to run stylelint with @newsteam/stylelint-config without having to do the manual peer dependency install step required if you
install @newsteam/stylelint-config directly.

## Usage

### Installation

1. Install the package:

  ```sh
  npm install --save-dev @newsteam/stylelint
  ```
2. Add `"extends": "@newsteam/stylelint"` to your .stylelintrc.
