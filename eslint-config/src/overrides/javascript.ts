

import * as typescript from "../rules/plugins/typescript";


export const javascriptOverrides = {
    files: ["*.js", "*.jsx"],
    // Creates a rule object with all the typescript rules turned off
    // eslint-disable-next-line unicorn/no-array-reduce -- see explanation
    rules: Object.keys(typescript.default.rules).reduce((accumulator, rule) => ({
        ...accumulator,
        [rule]: "off"
    }), {})
};
