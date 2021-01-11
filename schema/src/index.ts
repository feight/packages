

import Joi from "@hapi/joi";

import type { AlternativesSchema } from "./alternatives";
import {
    alternativesSchemaToJoi
} from "./alternatives";
import type { AnySchema } from "./any";
import {
    anySchemaToJoi
} from "./any";
import type { ArraySchema } from "./array";
import {
    arraySchemaToJoi
} from "./array";
import type { BinarySchema } from "./binary";
import {
    binarySchemaToJoi
} from "./binary";
import type { BooleanSchema } from "./boolean";
import {
    booleanSchemaToJoi
} from "./boolean";
import type { DateSchema } from "./date";
import {
    dateSchemaToJoi
} from "./date";
import type { NumberSchema } from "./number";
import {
    numberSchemaToJoi
} from "./number";
import type { ObjectSchema } from "./object";
import {
    objectSchemaToJoi
} from "./object";
import type { StringSchema } from "./string";
import {
    stringSchemaToJoi
} from "./string";
import type { Reference } from "./reference";
import {
    referenceToJoi
} from "./reference";

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

export type SchemaLike = Record<string, unknown> | Reference | Schema | boolean | null | number | string;

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


// eslint-disable-next-line @typescript-eslint/no-extraneous-class -- This class isn't extraneous, it gets exported
export class Validate{

    static map: Map<Record<string, unknown>, SchemaMap> = new Map<Record<string, unknown>, SchemaMap>();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Any is expected
    static compile(target: Record<string, any>): SchemaMap{

        const compiled = this.map.get(typeof target === "object" ? Object.getPrototypeOf(target) : target) ?? {};

        Object.keys(target).forEach((key) => {

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

        });

        return compiled;

    }

    static register(target: Record<string, unknown>, property: string, propertySchema: Schema): void{

        const schemaMap: SchemaMap = this.map.get(target) ?? {};

        schemaMap[property] = propertySchema;

        this.map.set(target, schemaMap);

    }

    static validate<ValidateType>(settings: ValidateType): ValidateType{

        const schemaMap = this.compile(settings);
        const validation = validateSchema(settings, schemaMap);

        if(validation.errors.length > 0){

            const SettingsSchemaValidationError = [
                "Settings Schema Validation Error",
                ""
            ]
            .concat(validation.errors)
            .concat([""])
            .join("\n");

            throw new Error(SettingsSchemaValidationError);

        }

        return validation.value;

    }

}

export const validate = function(propertySchema: Schema){

    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types -- Since target could be of any type, this is unavoidable
    return function value(target: any, propertyKey: string): void{

        Validate.register(target, propertyKey, propertySchema);

    };

};
