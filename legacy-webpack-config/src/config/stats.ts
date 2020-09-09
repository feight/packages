

import type { Configuration } from "webpack";


/*
 * The stats option lets you precisely control what bundle information gets
 * displayed. This can be a nice middle ground if you don't want to use quiet or
 * noInfo because you want some bundle information, but not all of it.
 *
 * https://webpack.js.org/configuration/stats/
 */
export const stats = function(): Configuration{

    return {
        stats: "minimal"
    };

};
