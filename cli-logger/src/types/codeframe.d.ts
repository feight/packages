

declare module "codeframe" {

    export function get(options: {
        column: number,
        file: string,
        line: number
    }): void;

}
