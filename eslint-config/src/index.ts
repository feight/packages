

import { overrides } from "./overrides";

import type { Linter } from "eslint";


const config: Linter.Config = {
    env: {
        browser: true,
        jasmine: true,
        node: true
    },
    extends: [
        "./rules/plugins/array-function",
        "./rules/plugins/async-await",
        "./rules/plugins/css-modules",
        "./rules/plugins/es",
        "./rules/plugins/eslint-comments",
        "./rules/plugins/filenames",
        "./rules/plugins/format-message",
        "./rules/plugins/jsx-control-statements",
        "./rules/plugins/import",
        "./rules/plugins/mdx",
        "./rules/plugins/more",
        "./rules/plugins/no-unsanitized",
        "./rules/plugins/no-useless-assign",
        "./rules/plugins/node",
        "./rules/plugins/optimize-regex",
        "./rules/plugins/prefer-object-spread",
        "./rules/plugins/promise",
        "./rules/plugins/react",
        "./rules/plugins/react-hooks",
        "./rules/plugins/react-native",
        "./rules/plugins/react-perf",
        "./rules/plugins/react-redux",
        "./rules/plugins/security",
        "./rules/plugins/sort-keys-fix",
        "./rules/plugins/typescript",
        "./rules/plugins/unicorn",
        "./rules/plugins/webassembly",
        "./rules/best-practices",
        "./rules/errors",
        "./rules/es6",
        "./rules/strict",
        "./rules/style",
        "./rules/variables"
    ].map((string: string) => require.resolve(string)),
    overrides,
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 2020,
        project: "./tsconfig.json",
        sourceType: "module",
        tsconfigRootDir: "./"
    },
    plugins: ["@typescript-eslint"]
};


export default config;
