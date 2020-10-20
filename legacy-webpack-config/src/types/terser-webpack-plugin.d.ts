


declare module "terser-webpack-plugin" {

    import { DefinePlugin } from 'webpack';

    interface PluginOptions{
        terserOptions: {
            mangle: boolean;
            output: {
                comments: boolean;
            };
        };
    }

    export default class TerserWebpackPlugin extends DefinePlugin{

        constructor(options: PluginOptions);

    }

}
