

declare module "speed-measure-webpack-plugin" {

    import { Configuration, Plugin } from 'webpack';

    interface SpeedMeasureWebpackPluginData{
        misc: {
            compileTime: number;
        }
    }

    interface SpeedMeasureWebpackPluginOptions{
        disable?: boolean;
        granularLoaderData?: boolean;
        outputFormat?: "json" | "human" | "humanVerbose"| ((blob: SpeedMeasureWebpackPluginData) => void | Promise<void>);
        outputTarget?: string | Function;
        pluginNames?: {
            [pluginName: string] : Plugin
        };
    }

    export default class SpeedMeasureWebpackPlugin extends Plugin{

        constructor(options: SpeedMeasureWebpackPluginOptions);

        wrap(configuration: Configuration): Configuration;

    }

}
