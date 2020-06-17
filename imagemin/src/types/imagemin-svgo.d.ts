
/// <reference types="node" />

declare module "imagemin-svgo" {

    interface Plugin{
        removeViewBox: boolean
    }

    interface Options {
        plugins: Plugin[];
    }

    export default function plugin(options: Options): (input: Buffer) => Promise<Buffer>;

}
