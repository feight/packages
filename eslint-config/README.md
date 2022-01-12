# @newsteam/eslint-config

[![License](https://img.shields.io/npm/l/@newsteam/eslint-config.svg)](https://github.com/feight/packages/blob/master/LICENSE)
[![npm package](https://img.shields.io/npm/v/@newsteam/eslint-config/latest.svg)](https://www.npmjs.com/package/@newsteam/eslint-config)
[![npm downloads](https://img.shields.io/npm/dm/@newsteam/eslint-config.svg)](https://www.npmjs.com/package/@newsteam/eslint-config)
[![Dependencies](https://img.shields.io/david/feight/packages.svg?path=eslint-config)](https://david-dm.org/feight/packages?path=eslint-config)
[![DevDependencies](https://img.shields.io/david/feight/packages.svg?path=eslint-config)](https://david-dm.org/feight/packages?type=dev&path=eslint-config)

This package provides a shared config for eslint and several of its plugins.

Optionally, it also includes support for eslinting typescript.

## Usage

A single ESLint configuration is exported.

Our default export contains all of our ESLint rules, including ECMAScript 6+ and several plugins. It requires the following peer dependencies:

```
    @typescript-eslint/eslint-plugin
    @typescript-eslint/parser
    eslint
    eslint-plugin-array-func
    eslint-plugin-async-await
    eslint-plugin-compat
    eslint-plugin-css-modules
    eslint-plugin-es
    eslint-plugin-eslint-comments
    eslint-plugin-filenames
    eslint-plugin-format-message
    eslint-plugin-import
    eslint-plugin-jsx-control-statements
    eslint-plugin-lean-imports
    eslint-plugin-more
    eslint-plugin-no-unsanitized
    eslint-plugin-no-useless-assign
    eslint-plugin-node
    eslint-plugin-optimize-regex
    eslint-plugin-prefer-object-spread
    eslint-plugin-promise
    eslint-plugin-react
    eslint-plugin-react-filenames
    eslint-plugin-react-hooks
    eslint-plugin-react-native
    eslint-plugin-react-perf
    eslint-plugin-react-ssr
    eslint-plugin-security
    eslint-plugin-sort-keys-fix
    eslint-plugin-unicorn
    eslint-plugin-webassembly
    eslint-plugin-you-dont-need-lodash-underscore
    eslint-plugin-you-dont-need-momentjs
    typescript
```

### Installation

1. Install the shared configuration:

  ```sh
  npm install --save-dev @newsteam/eslint-config
  ```

2. Install the shared configuration peer dependencies (npm 5+):

  ```sh
  npx install-peerdeps --dev @newsteam/eslint-config
  ```

3. Add this to your .eslintrc.

  ```json
    "extends": "@newsteam"
  ```

## Maintenance

You can run tests with `npm test`.

You can make sure this module lints with itself using `npm run lint`.