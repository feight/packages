

import Joi from "@hapi/joi";

import type {
    AnySchemaDefinition
} from "./any";
import {
    extendAnySchema
} from "./any";
import type {
    Reference
} from "./reference";
import {
    referenceToJoi
} from "./reference";


const convert = {
    encoding(schema: Joi.BinarySchema, value?: BinarySchemaDefinition["encoding"]): Joi.BinarySchema{
        return value ? schema.encoding(value) : schema;
    },
    length(schema: Joi.BinarySchema, value?: BinarySchemaDefinition["length"]): Joi.BinarySchema{
        return typeof value === "undefined" ? schema : schema.length(typeof value === "number" ? value : referenceToJoi(value));
    },
    max(schema: Joi.BinarySchema, value?: BinarySchemaDefinition["max"]): Joi.BinarySchema{
        return typeof value === "undefined" ? schema : schema.max(typeof value === "number" ? value : referenceToJoi(value));
    },
    min(schema: Joi.BinarySchema, value?: BinarySchemaDefinition["min"]): Joi.BinarySchema{
        return typeof value === "undefined" ? schema : schema.min(typeof value === "number" ? value : referenceToJoi(value));
    }
};


export type BinarySchema = BinarySchemaDefinition | "binary";

export interface BinarySchemaDefinition extends AnySchemaDefinition{

    type: "binary";

    default?: Buffer;

    /**
     * Sets the string encoding format if a string input is converted to a buffer.
     */
    encoding?: string;

    /**
     * Specifies the exact length of the buffer:
     */
    length?: Reference | number;

    /**
     * Specifies the maximum length of the buffer.
     */
    max?: Reference | number;

    /**
     * Specifies the minimum length of the buffer.
     */
    min?: Reference | number;
}

export const binarySchemaToJoi = function(type: BinarySchema): Joi.AnySchema{

    let schema = Joi.binary();

    if(type !== "binary"){

        schema = convert.encoding(schema, type.encoding);
        schema = convert.length(schema, type.length);
        schema = convert.max(schema, type.max);
        schema = convert.min(schema, type.min);

    }

    return extendAnySchema(schema, type);

};

