

import type { Linter } from "eslint";


export const mdxOverrides: Linter.ConfigOverride = {
    extends: ["plugin:mdx/overrides"],
    files: ["*.mdx"],
    // Overridden by eslint-plugin-mdx
    rules: {
        "no-unused-expressions": 0
    }
};
