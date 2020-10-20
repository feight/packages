


declare module "mini-css-extract-plugin" {

    import { DefinePlugin } from 'webpack';

    interface PluginOptions{}

    export default class MiniCssExtractWebpackPlugin extends DefinePlugin{

        static loader: string;

        constructor(options: PluginOptions);

    }

}
