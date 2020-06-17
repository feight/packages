

declare module "postcss-discard-empty" {

    import { Plugin } from "postcss";

    interface Options {}

    const plugin: Plugin<Options>;

    export default plugin;

}
