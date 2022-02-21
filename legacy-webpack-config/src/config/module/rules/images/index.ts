

import { fileLoader } from "../../../../shared/loaders/file";

import type {
    Configuration,
    RuleSetRule
} from "webpack";
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
            test: /\.widget\.(?:png|jpg|jpeg|webp)$/u,

            /*
             * We don't use an optimizer like image-webpack-loader because
             * we optimize images manually using assemble optimize
             */
            use: [
                {
                    loader: "responsive-loader",
                    options: {
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-require-imports, node/global-require -- YOLO
                        adapter: require("responsive-loader/sharp"),
                        emitFile: true,
                        esModule: true,
                        format: "webp",
                        // Hash is needed in both modes because changes that image-process-loader might make
                        name: options.mode === "production" ? "[hash].[ext]" : "[path][name].[hash].[ext]",
                        outputPath: "build/files",
                        placeholder: true,
                        placeholderSize: 10,
                        publicPath: "/build/files",
                        // eslint-disable-next-line @typescript-eslint/no-magic-numbers -- not magic
                        sizes: [25, 50, 100]
                    }
                }
            ]
        },

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
