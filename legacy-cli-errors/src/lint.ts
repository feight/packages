

import {
    CLIError,
    CLIErrorData
} from "./cli";


export type LintErrorData = CLIErrorData;


export class LintError extends CLIError{

    data: LintErrorData[];

    description: string;

    constructor(data: LintErrorData[]){

        super(data);

        this.data = data;

        this.name = "LintError";

        this.description = "Lint Error";

    }

}

