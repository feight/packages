
/// <reference types="node" />

declare module "imagemin-optipng" {

    interface Options {
        optimizationLevel: number;
    }

    export default function plugin(options: Options): (input: Buffer) => Promise<Buffer>;

}
