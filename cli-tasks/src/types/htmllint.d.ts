

declare module "htmllint" {

    export interface HtmlLintOptions{
        config?: string;
        maxerr?: number;
        rules?: {
            [id: string]: any
        };
    }

    export interface HtmlLintIssue{
        code: string;
        column: number;
        data: {
            attribute: string;
            format: string;
            value: string;
        },
        line: number;
        rule: string;
    }

    export default function htmllint(file: string, options?: HtmlLintOptions["rules"]): Promise<HtmlLintIssue[]>;

}