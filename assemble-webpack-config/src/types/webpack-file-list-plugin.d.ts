

declare module "webpack-file-list-plugin" {

    import { Plugin } from 'webpack';

    interface PluginOptions{
        filename: string,
        path: string
    }

    export default class WebpackFileListPlugin extends Plugin{

        constructor(options: PluginOptions);

    }

}
