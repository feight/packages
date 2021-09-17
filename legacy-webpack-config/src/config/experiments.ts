

import type { Configuration } from "webpack";


/*
 * Experiments option was introduced in webpack 5 to empower users with the ability
 * to activate and try out experimental features.
 *
 * https://webpack.js.org/configuration/experiments/
 */
export const experiments = function(): Configuration{

    return {
        experiments: {
            topLevelAwait: true
        }
    };

};
