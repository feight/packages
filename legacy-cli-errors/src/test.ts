

import type { CLIErrorData } from "./cli";
import { CLIError } from "./cli";


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

