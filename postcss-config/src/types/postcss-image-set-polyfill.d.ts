

declare module "postcss-image-set-polyfill" {

    import { Plugin } from "postcss";

    interface Options {}

    const plugin: Plugin<Options>;

    export default plugin;

}
