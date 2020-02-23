

declare module "gulp-babel-minify" {

    import stream from "stream";

    const minify:{

        (
            confing: {},
            overrides: {
                comments: boolean
            },
        ): stream.Transform;

    }

    export default minify;

}
