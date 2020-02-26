

import path from "path";

import { Validator } from "jsonschema";
import glob from "globby";
import fs from "fs-extra";
import { logger } from "@newsteam/cli-logger";
import {
    TestError,
    TestErrorData
} from "@newsteam/cli-errors";

import { label } from "..";


export class SettingsSchemaValidationError extends TestError{

    constructor(data: TestErrorData[]){

        super(data);

        this.name = "SettingsSchemaValidationError";

        this.description = "Settings Schema Validation Error";

    }

}


export interface SettingsSchemaTests{
    glob: string | string[];
    optional?: boolean;
    schema: string;
}


export interface TestSettingsTaskOptions{
    validations: SettingsSchemaTests[];
}


export const testSettingsTask = async function(options: TestSettingsTaskOptions): Promise<void>{

    const errors: TestErrorData[] = [];

    await Promise.all(options.validations.map(async (validation: SettingsSchemaTests) => {

        const files = await glob(validation.glob);

        files.forEach((file) => {

            logger.log(`schema ${ path.resolve(file) }`, { label });

            const data = JSON.parse(fs.readFileSync(file).toString());
            const schema = JSON.parse(fs.readFileSync(validation.schema).toString());
            const validator = new Validator();
            const result = validator.validate(data, schema);

            if(result.errors.length > 0){

                errors.push({
                    errors: result.errors.map((error) => ({
                        file,
                        message: error.stack || error.message
                    })),
                    file
                });

            }

        });

    }));

    if(errors.length > 0){

        throw new SettingsSchemaValidationError(errors);

    }

};
