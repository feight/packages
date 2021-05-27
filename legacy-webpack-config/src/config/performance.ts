

import type { Configuration } from "webpack";

import type { Options } from "..";


export const performance = function(
    options: Options
): Configuration{

    return {
        performance: {
            assetFilter(assetFilename: string): boolean{

                return (
                    assetFilename.endsWith(".js") ||
                    assetFilename.endsWith(".css")
                );

            },
            hints: options.mode === "production" ? "warning" : false,
            maxAssetSize: 250_000,
            maxEntrypointSize: 250_000
        }
    };

};
