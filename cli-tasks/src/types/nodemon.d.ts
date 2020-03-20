

declare module "nodemon" {

    const nodemon:{
        (
            options: {
                env: {
                    [id: string]: string | boolean | number;
                },
                ext: string,
                execMap?: {
                    [id: string]: string;
                },
                ignore: string[],
                script: string,
                stdout: boolean,
                watch: string[]
            }
        ): typeof nodemon;

        emit(
            event: string,
        ): void;

        on(
            event: string,
            callback: () => void
        ): typeof nodemon;

        on(
            event: "restart",
            callback: (files: string[]) => void
        ): typeof nodemon;

        stderr: typeof process.stderr
        stdout: typeof process.stdout

    }

    export default nodemon;

}
