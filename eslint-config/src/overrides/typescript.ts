

import type { Linter } from "eslint";


export const typescriptOverrides: Linter.ConfigOverride = {
    files: ["*.ts", "*.tsx"],
    // Overridden by @typescript-eslint
    rules: {
        "brace-style": "off",
        camelcase: "off",
        "comma-dangle": "off",
        "default-param-last": "off",
        "dot-notation": "off",
        indent: "off",
        "init-declarations": "off",
        "keyword-spacing": "off",
        "lines-between-class-members": "off",
        "no-duplicate-imports": "off",
        "no-empty-function": "off",
        "no-extra-parens": "off",
        "no-extra-semi": "off",
        "no-invalid-this": "off",
        "no-loop-func": "off",
        "no-loss-of-precision": "off",
        "no-magic-numbers": "off",
        "no-redeclare": "off",
        "no-shadow": "off",
        "no-undef-init": "off",
        "no-undefined": "off",
        "no-unused-vars": "off",
        "no-use-before-define": "off",
        "padding-line-between-statements": "off",
        quotes: "off",
        "require-await": "off",
        semi: "off",
        "space-before-function-paren": "off",
        "space-infix-ops": "off"
    }
};
