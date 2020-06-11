
/// <reference types="node" />

declare function imagemin(input: ReadonlyArray<string>, options: imagemin.Options): Promise<imagemin.Result[]>;

declare namespace imagemin {

    type Plugin = (input: Buffer) => Promise<Buffer>;

    interface Options {
        destination: string;
        plugins: ReadonlyArray<Plugin>;
    }

    interface Result {
        data: Buffer;
        path: string;
    }

    function buffer(buffer: Buffer, options?: Options): Promise<Buffer>;

}

declare module "imagemin" {

    export default imagemin;

}
