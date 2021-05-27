

import TerserPlugin from "terser-webpack-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import type { Configuration } from "webpack";

import type { Options } from "..";


export const optimization = function(
    options: Options
): Configuration{

    return {
        optimization: {

            /*
             * Setting this to false temporarily because it's breaking
             * the build.
             *
             * Setting this to true causes webpack to lose some modules
             * and throw a 'Cannot read property 'call' of undefined'
             */
            concatenateModules: false,
            emitOnErrors: !options.watch,
            flagIncludedChunks: true,
            mergeDuplicateChunks: true,
            minimize: options.mode === "production",
            minimizer: [
                new CssMinimizerPlugin(),
                new TerserPlugin({
                    terserOptions: {
                        mangle: true,
                        output: {
                            comments: false
                        }
                    }
                })
            ],
            nodeEnv: options.mode,
            providedExports: true,
            removeAvailableModules: true,
            removeEmptyChunks: true,
            sideEffects: true,
            splitChunks: {
                automaticNameDelimiter: "~",
                cacheGroups: {
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true
                    },
                    vendors: {
                        name: "vendor",
                        priority: -10,
                        test: /[/\\]node_modules[/\\]/u
                    }
                },
                chunks: "async",
                maxAsyncRequests: 5,
                maxInitialRequests: 3,
                minChunks: 1,
                name: false
            },
            usedExports: true
        }
    };

};
