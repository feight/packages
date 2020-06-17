
/// <reference types="node" />

declare module "imagemin-jpegtran" {

    interface Options {
        progressive: boolean;
    }

    export default function plugin(options: Options): (input: Buffer) => Promise<Buffer>;

}
