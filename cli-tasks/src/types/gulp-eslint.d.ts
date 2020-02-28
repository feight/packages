

declare module "gulp-eslint" {

    import stream from "stream";

    const eslint:{

        (options: {
            cache?: boolean,
            failAfterError?: boolean,
            fix?: boolean,
            reporters?: {
                formatter: (errorFiles: {
                    source: string,
                    warnings: {
                        column: number,
                        line: number | string,
                        text: string
                    }[]
                }[]) => void
            }[]
            warnFileIgnored?: boolean
        }): stream.Transform;

        failAfterError(): stream.Transform;

        format(
            formatter: (errorFiles: {
                filePath: string,
                messages: {
                    column: number,
                    line: number | string,
                    message: string,
                    ruleId: string
                }[]
            }[]) => void,
            callback: (message: string) => void
        ): stream.Transform;

    }

    export default eslint;

}
