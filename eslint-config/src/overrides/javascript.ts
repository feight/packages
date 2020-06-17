

import * as typescript from "../rules/plugins/typescript";


export const javascriptOverrides = {
    files: ["*.js", "*.jsx"],
    rules: Object.keys(typescript.default.rules).reduce((accumulator, rule) => ({
        ...accumulator,
        [rule]: "off"
    }), {})
};
