

import Joi from "@hapi/joi";

import {
    extendAnySchema,
    AnySchemaDefinition
} from "./any";

import {
    Schema,
    schemaToJoi
} from ".";


const convert = {
    try(schema: Joi.AlternativesSchema, value?: AlternativesSchemaDefinition["try"]): Joi.AlternativesSchema{
        return value ? schema.try(...(Array.isArray(value) ? value : [value]).map((item) => schemaToJoi(item))) : schema;
    }
};


export type AlternativesSchema = "alternatives" | AlternativesSchemaDefinition;

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

