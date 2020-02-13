

declare module "nodemon" {

    const nodemon:{
        (
            options: {
                env: {
                    [id: string]: string | boolean | number;
                },
                ext: string,
                script: string,
                stdout: boolean,
                watch: string[]
            }
        ): void;

        emit(
            event: string,
        ): void;

        on(
            event: string,
            callback: () => void
        ): void;

        on(
            event: "restart",
            callback: (files: string[]) => void
        ): void;

        stderr: typeof process.stderr
        stdout: typeof process.stdout

    }

    export default nodemon;

}
