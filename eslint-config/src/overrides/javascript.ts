

import type { Linter } from "eslint";

import * as typescript from "../plugins/typescript";


export const javascriptOverrides: Linter.ConfigOverride = {
    files: ["*.js", "*.jsx"],
    rules: Object.fromEntries(Object.keys(typescript.default.rules).map((rule) => [rule, "off"]))
};
