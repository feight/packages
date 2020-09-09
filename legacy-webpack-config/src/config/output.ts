

import path from "path";

import type { Configuration } from "webpack";

import type { Options } from "..";


export const output = function(
    options: Options
): Configuration{

    const hash = options.mode === "production" && !options.watch;

    return {
        output: {
            chunkFilename: `build/chunks/${ hash ? "[chunkhash].js" : "[id].js" }`,
            filename: `build/chunks/${ hash ? "[chunkhash].js" : "[name].js" }`,
            hashSalt: "salty",
            path: path.join(options.cwd, "src"),
            publicPath: "/"
        }
    };

};
