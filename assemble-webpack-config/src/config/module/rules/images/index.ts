

import merge from "webpack-merge";
import { Configuration } from "webpack";

import { fileLoader } from "../../../../shared/loaders/file";
import { Options } from "../../../..";
import { cacheLoader } from "../../../../shared/loaders/cache";


export const images = function(
    config: Configuration,
    options: Options
): Configuration{

    return merge(config, {
        module: {
            rules: [
                cacheLoader(),
                // .png .jpg .jpeg .gif .webp and .ico image extensions
                {
                    test: /\.(?:png|jpg|jpeg|gif|webp)$/u,

                    /*
                     * We don't use an optimizer like image-webpack-loader because
                     * we optimize images manually using tamland optimize
                     */
                    use: [
                        fileLoader(config, options),
                        {
                            loader: "image-process-loader"
                        }
                    ]
                },
                // .ico file loader
                {
                    test: /\.ico$/u,
                    use: [
                        fileLoader(config, options)
                    ]
                },
                // .string.svg
                {
                    test: /\.string\.svg$/u,
                    use: [
                        "svg-inline-loader"
                    ]
                },
                // .svg file loader
                {
                    test: /^((?!(\.string)).)*.svg$/u,
                    use: [
                        fileLoader(config, options)
                    ]
                }
            ]
        }
    });

};
