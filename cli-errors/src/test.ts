

export interface TestErrorData{
    file: string;
    errors: {
        column?: number;
        file: string;
        line?: number;
        message: string;
    }[];
}


export class TestError extends Error{

    data: TestErrorData[];

    description: string;

    constructor(data: TestErrorData[]){

        super("TestError");

        this.data = data;

        this.name = "TestError";

        this.description = "Test Error";

    }

}

