

declare module "postcss-minify-font-values" {

    import { Plugin } from "postcss";

    interface Options {}

    const plugin: Plugin<Options>;

    export default plugin;

}
