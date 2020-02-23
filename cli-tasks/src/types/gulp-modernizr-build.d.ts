

declare module "gulp-modernizr-build" {

    import stream from "stream";

    const modernizr:{

        (
            filename: string,
            config: {
                quiet?: boolean;
                addFeatures: string[];
            }
        ): stream.Transform;

    }

    export default modernizr;

}
