

import path from "path";

import {
    Validator,
    Schema
} from "jsonschema";
import glob from "globby";
import fs from "fs-extra";
import { logger } from "@newsteam/cli-logger";
import {
    TestError,
    TestErrorData
} from "@newsteam/cli-errors";
import { SettingsSchemaTests } from "@newsteam/cli-config";

import { label } from "..";


export class SettingsSchemaValidationError extends TestError{

    constructor(data: TestErrorData[]){

        super(data);

        this.name = "SettingsSchemaValidationError";

        this.description = "Settings Schema Validation Error";

    }

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

            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- This is safe since the validator accepts any
            const data = JSON.parse(fs.readFileSync(file).toString());
            const schema = JSON.parse(fs.readFileSync(validation.schema).toString()) as Schema;
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