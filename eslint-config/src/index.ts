

import type { Linter } from "eslint";

import { overrides } from "./overrides";


const config: Linter.Config = {
    env: {
        browser: true,
        jasmine: true,
        node: true
    },
    extends: [
        "./plugins/array-function",
        "./plugins/async-await",
        "./plugins/css-modules",
        "./plugins/es",
        "./plugins/eslint-comments",
        "./plugins/filenames",
        "./plugins/format-message",
        "./plugins/jsx-control-statements",
        "./plugins/import",
        "./plugins/more",
        "./plugins/no-unsanitized",
        "./plugins/no-useless-assign",
        "./plugins/node",
        "./plugins/optimize-regex",
        "./plugins/prefer-object-spread",
        "./plugins/promise",
        "./plugins/react",
        "./plugins/react-hooks",
        "./plugins/react-native",
        "./plugins/react-perf",
        "./plugins/security",
        "./plugins/sort-keys-fix",
        "./plugins/typescript",
        "./plugins/unicorn",
        "./plugins/webassembly",
        "./rules"
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
