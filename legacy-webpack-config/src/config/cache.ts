
import path from "path";

import type { Configuration } from "webpack";

import type { Options } from "..";


/*
 * Chooses a style of source mapping to enhance the debugging process. These
 * values can affect build and rebuild speed dramatically.
 *
 * https://webpack.js.org/configuration/other-options/#cache
 */
export const cache = function(
    options: Options
): Configuration{

    const development = {
        cacheDirectory: path.join(options.cwd, ".newsteam/cache/webpack"),
        type: "filesystem"
    } as Configuration["cache"];

    const production = false;

    return {
        cache: options.mode === "development" ? development : production
    };

};
