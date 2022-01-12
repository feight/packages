

import type { Linter } from "eslint";

import { javascriptOverrides } from "./javascript";
import { typescriptOverrides } from "./typescript";

export const overrides: Linter.ConfigOverride[] = [
    javascriptOverrides,
    typescriptOverrides
];
