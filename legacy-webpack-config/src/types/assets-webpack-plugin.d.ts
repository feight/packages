


declare module "assets-webpack-plugin" {

    import { DefinePlugin } from 'webpack';

    interface PluginOptions{
        filename: string;
        path: string;
    }

    export default class AssetsWebpackPlugin extends DefinePlugin{

        constructor(options: PluginOptions);

    }

}
