


declare module "optimize-css-assets-webpack-plugin" {

    import { DefinePlugin } from 'webpack';

    interface PluginOptions{}

    export default class OptimizeCssAssetsWebpackPlugin extends DefinePlugin{

        constructor(options: PluginOptions);

    }

}