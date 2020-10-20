


declare module "webpack-bundle-analyzer" {

    import { DefinePlugin } from 'webpack';

    interface PluginOptions{}

    export class BundleAnalyzerPlugin extends DefinePlugin{

        constructor(options: PluginOptions);

    }

}
