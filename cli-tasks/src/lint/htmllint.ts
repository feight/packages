

import path from "path";
import fs from "fs";

import htmllint, { HtmlLintIssue } from "htmllint";
import vinyl from "vinyl";
import { rcFile } from "rc-config-loader";
import { logger } from "@newsteam/cli-logger";
import {
    watch,
    WatchOptions
} from "@newsteam/cli-utils";
import {
    LintError,
    LintErrorData
} from "@newsteam/cli-errors";


export class HtmllintError extends LintError{

    constructor(data: LintErrorData[]){

        super(data);

        this.name = "HtmllintError";

        this.description = "Htmllint Error";

    }

}


export interface HtmllintFile extends vinyl{
    htmllint: {
        fixed: boolean;
    };
}


export interface HTMLLintOptions{
    config?: string;
    maxerr?: number;
    rules?: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [id: string]: any;
    };
}


export interface HtmllintLintTaskOptions extends WatchOptions{
    cache?: boolean;
    destination: string;
    fix?: boolean;
    options?: HTMLLintOptions;
    source: string;
    label?: string;
}


export const htmllintLintTask = async function(options: HtmllintLintTaskOptions): Promise<void>{

    const label = options.label ?? "lint";

    const config = (options?.options ?? rcFile("htmllint", {
        configFileName: ".htmllint",
        cwd: process.cwd()
    })?.config ?? { rules: {} }) as HTMLLintOptions;

    await watch(options, async (files: string[]): Promise<void> => {

        const errors: LintErrorData[] = [];

        const bar = logger.progress({
            label,
            tag: `htmllint ${ logger.colorizeText(`${ files.length }`, "#444") } ${ options.fix ? logger.colorizeText("(fix)", "#0f0") : "" }`,
            total: files.length + 1
        });

        bar.tick();

        // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
        await Promise.all(files.map((file) => new Promise(async (resolve) => {

            const html = fs.readFileSync(file, "utf8");

            let issues: HtmlLintIssue[] = [];

            try{

                issues = await htmllint(html, config.rules);

            }catch{}

            if(issues.length > 0){

                errors.push({
                    errors: issues.map((error) => ({
                        column: error.column,
                        file,
                        line: error.line,
                        message: error.rule
                    })),
                    file
                });

            }

            if(options.watch){

                logger.log(`lint ${ path.resolve(file) }`, { label });

            }else{

                bar.tick();

            }

            resolve();

        })));

        const error = new HtmllintError(errors);

        if(errors.length > 0){

            if(options.watch){

                logger.error(error);

            }else{

                throw error;

            }

        }

    });

};

