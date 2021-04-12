

import Joi from "joi";

import type { AnySchemaDefinition } from "./any";
import { extendAnySchema } from "./any";
import type { Reference } from "./reference";
import { referenceToJoi } from "./reference";


const numberReferenceToJoi = function(number: Reference | number): Joi.Reference | number{
    return typeof number === "number" ? number : referenceToJoi(number);
};

const convert = {
    greater(schema: Joi.NumberSchema, value?: NumberSchemaDefinition["greater"]): Joi.NumberSchema{
        return value ? schema.greater(numberReferenceToJoi(value)) : schema;
    },
    integer(schema: Joi.NumberSchema, value?: NumberSchemaDefinition["integer"]): Joi.NumberSchema{
        return value ? schema.integer() : schema;
    },
    less(schema: Joi.NumberSchema, value?: NumberSchemaDefinition["less"]): Joi.NumberSchema{
        return value ? schema.less(numberReferenceToJoi(value)) : schema;
    },
    max(schema: Joi.NumberSchema, value?: NumberSchemaDefinition["max"]): Joi.NumberSchema{
        return value ? schema.max(numberReferenceToJoi(value)) : schema;
    },
    min(schema: Joi.NumberSchema, value?: NumberSchemaDefinition["min"]): Joi.NumberSchema{
        return value ? schema.min(numberReferenceToJoi(value)) : schema;
    },
    multiple(schema: Joi.NumberSchema, value?: NumberSchemaDefinition["multiple"]): Joi.NumberSchema{
        return value ? schema.min(numberReferenceToJoi(value)) : schema;
    },
    negative(schema: Joi.NumberSchema, value?: NumberSchemaDefinition["negative"]): Joi.NumberSchema{
        return value ? schema.negative() : schema;
    },
    port(schema: Joi.NumberSchema, value?: NumberSchemaDefinition["port"]): Joi.NumberSchema{
        return value ? schema.port() : schema;
    },
    positive(schema: Joi.NumberSchema, value?: NumberSchemaDefinition["positive"]): Joi.NumberSchema{
        return value ? schema.positive() : schema;
    },
    precision(schema: Joi.NumberSchema, value?: NumberSchemaDefinition["precision"]): Joi.NumberSchema{
        return value ? schema.precision(value) : schema;
    },
    sign(schema: Joi.NumberSchema, value?: NumberSchemaDefinition["sign"]): Joi.NumberSchema{
        return value ? schema.sign(value) : schema;
    },
    unsafe(schema: Joi.NumberSchema, value?: NumberSchemaDefinition["unsafe"]): Joi.NumberSchema{
        return value ? schema.unsafe(value) : schema;
    }
};


export type NumberSchema = NumberSchemaDefinition | "number";

export interface NumberSchemaDefinition extends AnySchemaDefinition{

    type: "number";

    default?: number;

    /**
     * Specifies that the value must be greater than limit.
     * It can also be a reference to another field.
     */
    greater?: Reference | number;

    /**
     * Requires the number to be an integer (no floating point).
     */
    integer?: true;

    /**
     * Specifies that the value must be less than limit.
     * It can also be a reference to another field.
     */
    less?: Reference | number;

    /**
     * Specifies the maximum value.
     * It can also be a reference to another field.
     */
    max?: Reference | number;

    /**
     * Specifies the minimum value.
     * It can also be a reference to another field.
     */
    min?: Reference | number;

    /**
     * Specifies that the value must be a multiple of base.
     */
    multiple?: Reference | number;

    /**
     * Requires the number to be negative.
     */
    negative?: true;

    /**
     * Requires the number to be a TCP port, so between 0 and 65535.
     */
    port?: true;

    /**
     * Requires the number to be positive.
     */
    positive?: true;

    /**
     * Specifies the maximum number of decimal places where:
     */
    precision?: number;

    /**
     * Requires the number to be negative or positive.
     */
    sign?: "negative" | "positive";

    /**
     * Allows the number to be outside of JavaScript's safety range (Number.MIN_SAFE_INTEGER & Number.MAX_SAFE_INTEGER).
     */
    unsafe?: boolean;

}

export const numberSchemaToJoi = function(type: NumberSchema): Joi.AnySchema{

    let schema = Joi.number();

    if(type !== "number"){

        schema = convert.greater(schema, type.greater);
        schema = convert.integer(schema, type.integer);
        schema = convert.less(schema, type.less);
        schema = convert.max(schema, type.max);
        schema = convert.min(schema, type.min);
        schema = convert.multiple(schema, type.multiple);
        schema = convert.negative(schema, type.negative);
        schema = convert.port(schema, type.port);
        schema = convert.positive(schema, type.positive);
        schema = convert.precision(schema, type.precision);
        schema = convert.sign(schema, type.sign);
        schema = convert.unsafe(schema, type.unsafe);

    }

    return extendAnySchema(schema, type);

};

