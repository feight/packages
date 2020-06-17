

declare module "postcss-minify-params" {

    import { Plugin } from "postcss";

    interface Options {}

    const plugin: Plugin<Options>;

    export default plugin;

}
