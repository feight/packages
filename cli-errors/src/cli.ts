

export interface CLIErrorData{
    file: string;
    errors: {
        column?: number;
        file: string;
        line?: number;
        message: string;
    }[];
}


export class CLIError extends Error{

    data: CLIErrorData[];

    description: string;

    constructor(data: CLIErrorData[]){

        super("CLIError");

        this.data = data;

        this.name = "CLIError";

        this.description = "CLI Error";

    }

}

