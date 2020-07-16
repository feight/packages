


declare module "optimize-css-assets-webpack-plugin" {

    import { Plugin } from 'webpack';

    interface PluginOptions{}

    export default class webpackPlugin extends Plugin{

        constructor(options: PluginOptions);

    }

}
