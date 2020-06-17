# @newsteam/eslint

[![License](https://img.shields.io/npm/l/@newsteam/eslint.svg)](https://github.com/feight/packages/blob/master/LICENSE)
[![npm package](https://img.shields.io/npm/v/@newsteam/eslint/latest.svg)](https://www.npmjs.com/package/@newsteam/eslint)
[![npm downloads](https://img.shields.io/npm/dm/@newsteam/eslint.svg)](https://www.npmjs.com/package/@newsteam/eslint)
[![Dependencies](https://img.shields.io/david/feight/packages.svg?path=eslint)](https://david-dm.org/feight/packages?path=eslint)
[![DevDependencies](https://img.shields.io/david/feight/packages.svg?path=eslint)](https://david-dm.org/feight/packages?type=dev&path=eslint)

This package provides a set of dependencies that can be used to run eslint with @newsteam/eslint-config without having to do the manual peer dependency install step required if you
install @newsteam/eslint-config directly.

## Usage

### Installation

1. Install the package:

  ```sh
  npm install --save-dev @newsteam/eslint
  ```
2. Add `"extends": "@newsteam"` to your .eslintrc.
