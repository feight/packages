

declare module "@thollingshead/gulp-flake8" {

    import stream from "stream";

    const defaultExport:{

        (options?: {
            args?: string[],
            bin?: string,
            config?: string
        }): stream.Transform;

        failOnError(): stream.Transform;

        reporter(
            format: (response: {
                flake8: {
                    errorCount: number,
                    success: boolean,
                    errorList: {
                        filename: string,
                        row: string,
                        column: string,
                        reason: string
                    }[]
                }
            }) => void
        ): stream.Transform;

    }

    export default defaultExport;

}
