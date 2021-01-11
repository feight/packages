

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


type DateType = Date | Reference | number | string | "now";

const formatDateType = function(date: DateType): Date | Joi.Reference | number | string | "now"{

    if(typeof date === "string" || typeof date === "number" || date instanceof Date){

        return date;

    }

    return referenceToJoi(date);

};

const convert = {
    greater(schema: Joi.DateSchema, value?: DateSchemaDefinition["greater"]): Joi.DateSchema{
        return value ? schema.greater(formatDateType(value)) : schema;
    },
    iso(schema: Joi.DateSchema, value?: DateSchemaDefinition["iso"]): Joi.DateSchema{
        return value ? schema.iso() : schema;
    },
    less(schema: Joi.DateSchema, value?: DateSchemaDefinition["less"]): Joi.DateSchema{
        return value ? schema.less(formatDateType(value)) : schema;
    },
    max(schema: Joi.DateSchema, value?: DateSchemaDefinition["max"]): Joi.DateSchema{
        return value ? schema.max(formatDateType(value)) : schema;
    },
    min(schema: Joi.DateSchema, value?: DateSchemaDefinition["min"]): Joi.DateSchema{
        return value ? schema.min(formatDateType(value)) : schema;
    },
    timestamp(schema: Joi.DateSchema, value?: DateSchemaDefinition["timestamp"]): Joi.DateSchema{
        return value ? schema.timestamp(value === true ? undefined : value) : schema;
    }
};


export type DateSchema = DateSchemaDefinition | "date";

export interface DateSchemaDefinition extends AnySchemaDefinition{

    type: "date";

    default?: Date;

    /**
     * Specifies that the value must be greater than date.
     * Notes: 'now' can be passed in lieu of date so as to always compare relatively to the current date,
     * allowing to explicitly ensure a date is either in the past or in the future.
     * It can also be a reference to another field.
     */
    greater?: DateType;

    /**
     * Requires the string value to be in valid ISO 8601 date format.
     */
    iso?: true;

    /**
     * Specifies that the value must be less than date.
     * Notes: 'now' can be passed in lieu of date so as to always compare relatively to the current date,
     * allowing to explicitly ensure a date is either in the past or in the future.
     * It can also be a reference to another field.
     */
    less?: DateType;

    /**
     * Specifies the latest date allowed.
     * Notes: 'now' can be passed in lieu of date so as to always compare relatively to the current date,
     * allowing to explicitly ensure a date is either in the past or in the future.
     * It can also be a reference to another field.
     */
    max?: DateType;

    /**
     * Specifies the oldest date allowed.
     * Notes: 'now' can be passed in lieu of date so as to always compare relatively to the current date,
     * allowing to explicitly ensure a date is either in the past or in the future.
     * It can also be a reference to another field.
     */
    min?: DateType;

    /**
     * Requires the value to be a timestamp interval from Unix Time.
     * @default "javascript"
     */
    timestamp?: "javascript" | "unix" | true;

}

export const dateSchemaToJoi = function(type: DateSchema): Joi.AnySchema{

    let schema = Joi.date();

    if(type !== "date"){

        schema = convert.greater(schema, type.greater);
        schema = convert.iso(schema, type.iso);
        schema = convert.less(schema, type.less);
        schema = convert.max(schema, type.max);
        schema = convert.min(schema, type.min);
        schema = convert.timestamp(schema, type.timestamp);

    }

    return extendAnySchema(schema, type);

};

