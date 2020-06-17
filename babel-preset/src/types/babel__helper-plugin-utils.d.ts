

declare module "@babel/helper-plugin-utils" {

    import {
        ConfigAPI,
        PluginItem,
        TransformOptions
    } from "@babel/core";

    export function declare(func: (
        api: ConfigAPI,
        options: any
    ) => TransformOptions): {
        col: number;
        row: number;
    };

}
