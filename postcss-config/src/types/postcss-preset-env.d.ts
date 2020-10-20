

declare module "postcss-preset-env" {

    import { Transformer } from "postcss";

    const transformer: Transformer;

    export default transformer;

}
