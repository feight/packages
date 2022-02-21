

import Joi from "joi";

import { extendAnySchema } from "./any";

import type { AnySchemaDefinition } from "./any";


const convert = {
    falsy(schema: Joi.BooleanSchema, value?: BooleanSchemaDefinition["falsy"]): Joi.BooleanSchema{

        if(value){

            const falsy = Array.isArray(value) ? value : [value];

            return schema.falsy(...falsy);

        }

        return schema;

    },
    sensitive(schema: Joi.BooleanSchema, value?: BooleanSchemaDefinition["sensitive"]): Joi.BooleanSchema{
        return value ? schema.sensitive() : schema;
    },
    truthy(schema: Joi.BooleanSchema, value?: BooleanSchemaDefinition["truthy"]): Joi.BooleanSchema{

        if(value){

            const truthy = Array.isArray(value) ? value : [value];

            return schema.truthy(...truthy);

        }

        return schema;

    }
};


export type BooleanSchema = BooleanSchemaDefinition | "boolean";

export interface BooleanSchemaDefinition extends AnySchemaDefinition{

    type: "boolean";

    default?: boolean;

    /**
     * Allows for additional values to be considered valid booleans by converting
     * them to false during validation. String comparisons are by default case insensitive,
     * see `boolean.sensitive` to change this behavior.
     */
    falsy?: (number | string)[] | number | string;

    /**
     * Allows the values provided to truthy and falsy as well as the "true" and
     * "false" default conversion to be matched in a case insensitive manner.
     */
    sensitive?: boolean;

    /**
     * Allows for additional values to be considered valid booleans by converting
     * them to true during validation. String comparisons are by default case
     * insensitive, see `boolean.sensitive()` to change this behavior.
     */
    truthy?: (number | string)[] | number | string;

}

export const booleanSchemaToJoi = function(type: BooleanSchema): Joi.AnySchema{

    let schema = Joi.boolean();

    if(type !== "boolean"){

        schema = convert.falsy(schema, type.falsy);
        schema = convert.sensitive(schema, type.sensitive);
        schema = convert.truthy(schema, type.truthy);

    }

    return extendAnySchema(schema, type);

};

