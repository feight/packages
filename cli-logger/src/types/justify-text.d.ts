

declare module "justify-text" {

    export function ljust(
        string: string,
        width: number,
        padding?: string
    ): string;

    export function rjust(
        string: string,
        width: number,
        padding?: string
    ): string;

}
