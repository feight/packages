

import Joi from "joi";

import type {
    AlternativesSchema,
    AlternativesSchemaDefinition
} from "./alternatives";
import type {
    AnySchema,
    AnySchemaDefinition
} from "./any";
import type {
    ArraySchema,
    ArraySchemaDefinition
} from "./array";
import type {
    BinarySchema,
    BinarySchemaDefinition
} from "./binary";
import type {
    BooleanSchema,
    BooleanSchemaDefinition
} from "./boolean";
import type {
    DateSchema,
    DateSchemaDefinition
} from "./date";
import type {
    NumberSchema,
    NumberSchemaDefinition
} from "./number";
import type {
    ObjectSchema,
    ObjectSchemaDefinition
} from "./object";
import type {
    StringSchema,
    StringSchemaDefinition
} from "./string";
import type { Reference } from "./reference";
import { alternativesSchemaToJoi } from "./alternatives";
import { anySchemaToJoi } from "./any";
import { arraySchemaToJoi } from "./array";
import { binarySchemaToJoi } from "./binary";
import { booleanSchemaToJoi } from "./boolean";
import { dateSchemaToJoi } from "./date";
import { numberSchemaToJoi } from "./number";
import { objectSchemaToJoi } from "./object";
import { stringSchemaToJoi } from "./string";
import { referenceToJoi } from "./reference";


export type { AlternativesSchema } from "./alternatives";
export type { AlternativesSchemaDefinition } from "./alternatives";
export type { AnySchema } from "./any";
export type { AnySchemaDefinition } from "./any";
export type { ArraySchema } from "./array";
export type { ArraySchemaDefinition } from "./array";
export type { BinarySchema } from "./binary";
export type { BinarySchemaDefinition } from "./binary";
export type { BooleanSchema } from "./boolean";
export type { BooleanSchemaDefinition } from "./boolean";
export type { DateSchema } from "./date";
export type { DateSchemaDefinition } from "./date";
export type { NumberSchema } from "./number";
export type { NumberSchemaDefinition } from "./number";
export type { ObjectSchema } from "./object";
export type { ObjectSchemaDefinition } from "./object";
export type { StringSchema } from "./string";
export type { StringSchemaDefinition } from "./string";


export type SchemaDefinition =
    AlternativesSchemaDefinition |
    AnySchemaDefinition |
    ArraySchemaDefinition |
    BinarySchemaDefinition |
    BooleanSchemaDefinition |
    DateSchemaDefinition |
    NumberSchemaDefinition |
    ObjectSchemaDefinition |
    StringSchemaDefinition;


export type Schema =
    AlternativesSchema |
    AnySchema |
    ArraySchema |
    BinarySchema |
    BooleanSchema |
    DateSchema |
    NumberSchema |
    ObjectSchema |
    StringSchema;


export type SchemaMap = Record<string, SchemaLike>;


export interface ValidationResult<TValue>{
    errors: string[];
    value: TValue;
}


export type SchemaLike = Record<string, unknown> | Reference | Schema | boolean | number | string | null;


export type ValidationSchema = Joi.Schema | Schema | SchemaMap;


export const schemaToJoi = function(schema: Schema | SchemaMap): Joi.Schema{

    if(typeof schema === "string" || schema.type){

        switch(typeof schema === "string" ? schema : schema.type){

            case "alternatives" :

                return alternativesSchemaToJoi(schema as AlternativesSchema);

            case "any" :

                return anySchemaToJoi(schema as AnySchema);

            case "array" :

                return arraySchemaToJoi(schema as ArraySchema);

            case "binary" :

                return binarySchemaToJoi(schema as BinarySchema);

            case "boolean" :

                return booleanSchemaToJoi(schema as BooleanSchema);

            case "date" :

                return dateSchemaToJoi(schema as DateSchema);

            case "number" :

                return numberSchemaToJoi(schema as NumberSchema);

            case "object" :

                return objectSchemaToJoi(schema as ObjectSchema);

            case "string" :

                return stringSchemaToJoi(schema as StringSchema);

            default :

                return stringSchemaToJoi(schema as StringSchema);

        }

    }else{

        const objectSchema = {
            keys: schema as SchemaMap,
            type: "object"
        };

        return objectSchemaToJoi(objectSchema as ObjectSchema);

    }

};


export const schemaLikeToJoi = function(schemaLike: SchemaLike): Joi.SchemaLike{

    if(
        typeof schemaLike === "string" ||
        typeof schemaLike === "object" &&
        schemaLike !== null
    ){

        const like = schemaLike as Reference | Schema;

        switch(typeof like === "string" ? like : like.type){

            case "alternatives" :
            case "any" :
            case "array" :
            case "binary" :
            case "boolean" :
            case "date" :
            case "number" :
            case "object" :
            case "string" :

                return schemaToJoi(like as Schema);

            case "reference" :

                return referenceToJoi(like as Reference);

            default :

                return like;

        }

    }else{

        return schemaLike;

    }

};


export const validateSchema = function<TValue>(value: TValue, schema: ValidationSchema): ValidationResult<TValue>{

    const validator = Joi.isSchema(schema) ? schema as Joi.Schema : schemaToJoi(schema as Schema | SchemaMap);

    const result = validator.validate(value, {
        abortEarly: false
    });

    const errors: Joi.ValidationErrorItem[] = result.error?.details ?? [];

    return {
        errors: errors.map((error: Joi.ValidationErrorItem) => error.message),
        value
    };

};


export const Validate: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- expected
    compile: (target: Record<string, any>) => SchemaMap;
    map: Map<Record<string, unknown>, SchemaMap>;
    register: (target: Record<string, unknown>, property: string, propertySchema: Schema) => void;
    validate: <ValidateType>(settings: ValidateType) => ValidateType;
} = {

    compile(target): SchemaMap{

        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- expected
        const compiled = this.map.get(typeof target === "object" ? Object.getPrototypeOf(target) : target) ?? {};

        for(const key of Object.keys(target)){

            if(!compiled[key]){

                switch(typeof target[key]){

                    case "object" :

                        if(Array.isArray(target[key])){

                            compiled[key] = {
                                items: {
                                    type: "any"
                                },
                                type: "array"
                            };

                        }else{

                            compiled[key] = {
                                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- expected
                                keys: this.compile(target[key]),
                                type: "object"
                            };

                        }

                        break;

                    case "string" :

                        compiled[key] = {
                            allow: "",
                            type: "string"
                        };

                        break;

                    case "number" :

                        compiled[key] = "number";

                        break;

                    case "boolean" :

                        compiled[key] = "boolean";

                        break;

                    default :

                        compiled[key] = "any";

                }

            }

        }

        return compiled;

    },

    map: new Map<Record<string, unknown>, SchemaMap>(),

    register(target, property, propertySchema): void{

        const schemaMap: SchemaMap = this.map.get(target) ?? {};

        schemaMap[property] = propertySchema;

        this.map.set(target, schemaMap);

    },

    validate<ValidateType>(settings: ValidateType): ValidateType{

        const schemaMap = this.compile(settings);
        const validation = validateSchema(settings, schemaMap);

        if(validation.errors.length > 0){

            const SettingsSchemaValidationError = [
                ...[
                    "Settings Schema Validation Error",
                    "",
                    ...validation.errors
                ],
                ""
            ]
            .join("\n");

            throw new Error(SettingsSchemaValidationError);

        }

        return validation.value;

    }

};


export const validate = function(propertySchema: Schema){

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any -- expected
    return function value(target: any, propertyKey: string): void{

        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- expected
        Validate.register(target, propertyKey, propertySchema);

    };

};
