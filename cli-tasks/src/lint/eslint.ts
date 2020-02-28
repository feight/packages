

import path from "path";

import cache from "gulp-cache";
import fs from "fs-extra";
import eslint from "gulp-eslint";
import gulp from "gulp";
import gulpIf from "gulp-if";
import vinyl from "vinyl";
import {
    gulp as gulpUtils,
    watch,
    WatchOptions
} from "@newsteam/cli-utils";
import {
    LintError,
    LintErrorData
} from "@newsteam/cli-errors";
import { logger } from "@newsteam/cli-logger";
import { CLIEngine } from "eslint";


const rawPackageJSON = String(fs.readFileSync(path.join(process.cwd(), "package.json")));


export class ESLintError extends LintError{

    constructor(data: LintErrorData[]){

        super(data);

        this.name = "ESLintError";

        this.description = "ESLint Error";

    }

}

export interface ESLintFile extends vinyl{
    eslint: {
        fixed: boolean;
    };
}


export interface EslintTaskConfig{
    cache: boolean;
    fix: boolean;
    warnFileIgnored: boolean;

}


export interface EslintLintTaskOptions extends WatchOptions{
    config?: EslintTaskConfig;
    destination: string;
    source: string;
    label?: string;
}


export const eslintLintTask = async function(options: EslintLintTaskOptions): Promise<void>{

    const label = options.label ?? "lint";

    const config: EslintTaskConfig = {
        cache: true,
        fix: false,
        warnFileIgnored: true,
        ...options.config
    };

    const eslintCLI = new CLIEngine({
        cache: config.cache,
        cacheLocation: "node_modules/.cache/@newsteam/cli-tasks/.eslintcache",
        fix: config.fix,
        useEslintrc: true
    });


    await watch(options, async (files: string[]): Promise<void> => {

        await new Promise((resolve) => {

            const errors: LintErrorData[] = [];

            for(const file of files){

                logger.log(`lint ${ path.resolve(file) }`, { label });

                const report = eslintCLI.executeOnFiles([file]);

                if(config.fix){
                    CLIEngine.outputFixes(report);
                }

                const [result] = report.results;

                if(result.errorCount > 0){

                    errors.push({
                        errors: result.messages.map((error) => ({
                            column: error.column,
                            file,
                            line: error.line,
                            message: `${ error.message } ${ error.ruleId ? `(${ error.ruleId })` : "" }`
                        })),
                        file
                    });

                    // Console.log(result.messages);

                }

            }

            const error = new ESLintError(errors);

            if(options.watch){

                logger.error(error);

            }else if(errors.length > 0){

                throw error;

            }

            resolve();

        });

    });

};

