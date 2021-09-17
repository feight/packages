

import type { Linter } from "eslint";

import { javascriptOverrides } from "./javascript";
import { typescriptOverrides } from "./typescript";
import { mdxOverrides } from "./mdx";

export const overrides: Linter.ConfigOverride[] = [
    javascriptOverrides,
    typescriptOverrides,
    mdxOverrides
];
