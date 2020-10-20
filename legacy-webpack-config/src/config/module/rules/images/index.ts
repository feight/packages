

import type {
    Configuration,
    RuleSetRule
} from "webpack";

import { fileLoader } from "../../../../shared/loaders/file";
import type { Options } from "../../../..";


export const images = function(
    config: Configuration,
    options: Options
): RuleSetRule[]{

    return [

        /*
         * .png .jpg .jpeg .gif .webp and .ico image extensions
         */
        {
            test: /\.(?:png|jpg|jpeg|webp)$/u,

            /*
             * We don't use an optimizer like image-webpack-loader because
             * we optimize images manually using assemble optimize
             */
            use: [
                fileLoader(config, options)
            ]
        },
        // .ico file loader
        {
            test: /\.gif$/u,
            use: [
                fileLoader(config, options)
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
    ];

};
