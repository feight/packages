

declare module "postcss-colormin" {

    import { Plugin } from "postcss";

    interface Options {}

    const plugin: Plugin<Options>;

    export default plugin;

}
