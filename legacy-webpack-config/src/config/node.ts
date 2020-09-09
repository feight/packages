

import type { Configuration } from "webpack";


/*
 * Configures whether to polyfill or mock certain Node.js globals and modules
 *
 * https://webpack.js.org/configuration/node/
 */
export const node = function(): Configuration{

    return {
        node: {
            fs: "empty"
        }
    };

};
