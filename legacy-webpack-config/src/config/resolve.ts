

import path from "path";

import type { Configuration } from "webpack";

import type { Options } from "..";


export const resolve = function(
    options: Options,
    config: Configuration
): Configuration{


    return {
        resolve: {
            alias: {
                "@src": path.resolve(__dirname, "src"),
                base: path.resolve(options.cwd, "src/publication/base"),
                build: path.resolve(options.cwd, "src/build"),
                custom: path.resolve(options.cwd, "src/publication/custom"),
                modernizr$: path.resolve(path.join(options.cwd, ".modernizr.js")),
                settings: path.resolve(options.cwd, "src/settings"),
                shared: path.resolve(options.cwd, "src/publication/shared"),
                ...config.resolve?.alias
            },

            /*
             * The order of these is significant. It determinds which extension
             * will be matched when the dependency is defined without a file
             * extension in the path
             */
            extensions: [
                ".ts",
                ".tsx",
                ".mjs",
                ".js",
                ".jsx",
                ".md",
                ".mdx",
                ".scss",
                ".css",
                ".html",
                ".woff",
                ".woff2",
                ".ttf",
                ".ttx",
                ".otf",
                ".eot"
            ],
            fallback: {
                path: require.resolve("path-browserify")
            },
            mainFields: [
                "browser",
                "module",
                "main"
            ],
            modules: [
                "node_modules",
                "assemble/node_modules",
                "src/publication/custom/node_modules",
                "src"
            ],
            symlinks: false
        }
    };

};
