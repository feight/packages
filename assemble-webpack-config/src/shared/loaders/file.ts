

import {
    Configuration,
    NewLoader
} from "webpack";

import { Options } from "../..";


export const fileLoader = function(
    config: Configuration,
    options: Options
): NewLoader{

    /*
     * The file-loader resolves import/require() on a file into a url
     * and emits the file into the output directory.
     *
     * https://github.com/webpack-contrib/file-loader
     */
    return {
        loader: "file-loader",
        options: {
            emitFile: true,
            // Hash is needed in both modes because changes that image-process-loader might make
            name: options.mode === "production" ? "[hash].[ext]" : "[path][name].[hash].[ext]",
            outputPath: "build/files",
            publicPath: "/build/files"
        }
    };

};
