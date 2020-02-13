


declare module "gulp-stylelint" {

    import stream from "stream";

    export default function stylelint(options: {
        failAfterError: boolean,
        fix: boolean,
        reporters: {
            formatter: (errorFiles: {
                source: string,
                warnings: {
                    column: number,
                    line: number | string,
                    text: string
                }[]
            }[]) => void
        }[];
    }): stream.Transform;

}

