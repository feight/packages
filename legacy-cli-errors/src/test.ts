

import { CLIError } from "./cli";

import type { CLIErrorData } from "./cli";


export type TestErrorData = CLIErrorData;


export class TestError extends CLIError{

    data: TestErrorData[];

    description: string;

    constructor(data: TestErrorData[]){

        super(data);

        this.data = data;

        this.name = "TestError";

        this.description = "Test Error";

    }

}

