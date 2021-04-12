

import Joi from "joi";

import type { AnySchemaDefinition } from "./any";
import { extendAnySchema } from "./any";

import type { Schema } from ".";
import { schemaToJoi } from ".";


const convert = {
    try(schema: Joi.AlternativesSchema, value?: AlternativesSchemaDefinition["try"]): Joi.AlternativesSchema{
        return value ? schema.try(...(Array.isArray(value) ? value : [value]).map((item) => schemaToJoi(item))) : schema;
    }
};


export type AlternativesSchema = AlternativesSchemaDefinition | "alternatives";

export interface AlternativesSchemaDefinition extends AnySchemaDefinition{

    type: "alternatives";

    /**
     * Alternative schema types for attempting to match against the validated value.
     */
    try?: Schema | Schema[];

}


export const alternativesSchemaToJoi = function(type: AlternativesSchema): Joi.AnySchema{

    let schema = Joi.alternatives();

    if(type !== "alternatives"){

        schema = convert.try(schema, type.try);

    }

    return extendAnySchema(schema, type);

};

