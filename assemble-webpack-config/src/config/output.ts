

import path from "path";

import { Configuration } from "webpack";

import { Options } from "..";


export const output = function(
    options: Options
): Configuration{

    const hash = options.mode === "production" && !options.watch;

    return {
        output: {
            chunkFilename: hash ? "[chunkhash].js" : "[id].js",
            filename: hash ? "[chunkhash].js" : "[name].js",
            hashSalt: "salty",
            path: path.join(options.cwd, "src"),
            publicPath: "/build/chunks/"
        }
    };

};
