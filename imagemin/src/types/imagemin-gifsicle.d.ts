
/// <reference types="node" />

declare module "imagemin-gifsicle" {

    interface Options {
        interlaced: boolean;
    }

    export default function plugin(options: Options): (input: Buffer) => Promise<Buffer>;

}
