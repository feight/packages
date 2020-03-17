

import Joi from "@hapi/joi";

import {
    referenceToJoi,
    Reference
} from "./reference";

import {
    Schema,
    SchemaLike,
    schemaLikeToJoi
} from ".";


const convert = {
    allow(schema: Joi.Schema, value: AnySchemaDefinition["allow"]): Joi.Schema{
        return typeof value === "undefined" ? schema : schema.allow(...Array.isArray(value) ? value : [value]);
    },
    custom(schema: Joi.Schema, value: AnySchemaDefinition["custom"]): Joi.Schema{
        return value ? schema.custom(value.method, value.description) : schema;
    },
    default(schema: Joi.Schema, value: AnySchemaDefinition["default"]): Joi.Schema{
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return value ? schema.default(value.type === "reference" ? referenceToJoi(value) : value) : schema;
    },
    description(schema: Joi.Schema, value: AnySchemaDefinition["description"]): Joi.Schema{
        return value ? schema.description(value) : schema;
    },
    empty(schema: Joi.Schema, value: AnySchemaDefinition["empty"]): Joi.Schema{
        return typeof value === "undefined" ? schema : schema.empty(schemaLikeToJoi(value));
    },
    error(schema: Joi.Schema, value: AnySchemaDefinition["error"]): Joi.Schema{
        return typeof value === "undefined" ? schema : schema.error(value);
    },
    example(schema: Joi.Schema, value: AnySchemaDefinition["example"]): Joi.Schema{
        return value ? schema.example(value) : schema;
    },
    external(schema: Joi.Schema, value: AnySchemaDefinition["external"]): Joi.Schema{
        return value ? schema.external(value.method, value.description) : schema;
    },
    forbidden(schema: Joi.Schema, value: AnySchemaDefinition["forbidden"]): Joi.Schema{
        return value ? schema.forbidden() : schema;
    },
    label(schema: Joi.Schema, value: AnySchemaDefinition["label"]): Joi.Schema{
        return value ? schema.label(value) : schema;
    },
    meta(schema: Joi.Schema, value: AnySchemaDefinition["meta"]): Joi.Schema{
        return value ? schema.meta(value) : schema;
    },
    note(schema: Joi.Schema, value: AnySchemaDefinition["note"]): Joi.Schema{
        return value ? schema.note(...Array.isArray(value) ? value : [value]) : schema;
    },
    prefs(schema: Joi.Schema, value: AnySchemaDefinition["prefs"]): Joi.Schema{
        return value ? schema.prefs(value) : schema;
    },
    presence(schema: Joi.Schema, value: AnySchemaDefinition["presence"]): Joi.Schema{
        return value ? schema.presence(value) : schema;
    },
    raw(schema: Joi.Schema, value: AnySchemaDefinition["raw"]): Joi.Schema{
        return value ? schema.raw() : schema;
    },
    required(schema: Joi.Schema, value: AnySchemaDefinition["required"]): Joi.Schema{
        return value ? schema.required() : schema;
    },
    tag(schema: Joi.Schema, value: AnySchemaDefinition["tag"]): Joi.Schema{
        return value ? schema.tag(...Array.isArray(value) ? value : [value]) : schema;
    },
    unit(schema: Joi.Schema, value: AnySchemaDefinition["unit"]): Joi.Schema{
        return value ? schema.unit(value) : schema;
    },
    valid(schema: Joi.Schema, value: AnySchemaDefinition["valid"]): Joi.Schema{
        return value ? schema.valid(...Array.isArray(value) ? value : [value]) : schema;
    }
};


export type PresenceMode = "optional" | "required" | "forbidden";

export type AnySchema = "any" | AnySchemaDefinition;

export interface AnySchemaDefinition{

    /**
     * The schema type
     */
    type:
        "any" |
        "array" |
        "binary" |
        "boolean" |
        "date" |
        "number" |
        "object" |
        "string";

    /**
     * Whitelists a value
     */
    // This any type supports default values of any type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    allow?: any;

    /**
     * Adds a custom validation function.
     */
    custom?: {
        method: Joi.CustomValidator;
        description?: string;
    };

    /**
     * Sets a default value if the original value is undefined.
     *
     * @param { any | Reference }
     *
     *   value supports references.
     *   value may also be a function which returns the default value.
     *   If value is specified as a function that accepts a single parameter, that parameter will be a context
     *    object that can be used to derive the resulting value. This clones the object however, which incurs some
     *    overhead so if you don't need access to the context define your method so that it does not accept any
     *    parameters.
     *   Without any value, default has no effect, except for object that will then create nested defaults
     *    (applying inner defaults of that object).
     *
     * When specifying a method you must either have a description property on your method or the
     *  second parameter is required.
     */
    // This any type supports default values of any type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    default?: any | Reference;

    /**
     * Annotates the schema
     */
    description?: string;

    /**
     * Adds the provided values into the allowed whitelist and marks them as the only valid values allowed.
     */
    equal?: string | string[];

    /**
     * Considers anything that matches the schema to be empty (undefined).
     */
    empty?: SchemaLike;

    /**
     * Overrides the default joi error with a custom error if the rule fails where:
     * can be:
     *   an instance of `Error` - the override error.
     *   a `function(errors)`, taking an array of errors as argument, where it must either:
     *    return a `string` - substitutes the error message with this text
     *    return a single ` object` or an `Array` of it, where:
     *     `type` - optional parameter providing the type of the error (eg. `number.min`).
     *     `message` - optional parameter if `template` is provided, containing the text of the error.
     *     `template` - optional parameter if `message` is provided, containing a template string, using the same format as usual joi language errors.
     *     `context` - optional parameter, to provide context to your error if you are using the `template`.
     *    return an `Error` - same as when you directly provide an `Error`, but you can customize the error message based on the errors.
     *
     * Note that if you provide an `Error`, it will be returned as-is, unmodified and undecorated with any of the
     * normal joi error properties. If validation fails and another error is found before the error
     * override, that error will be returned and the override will be ignored (unless the `abortEarly`
     * option has been set to `false`).
     */
    error?: Error | Joi.ValidationErrorFunction;

    /**
     * Annotates the key with an example value, must be valid.
     */
    example?: string;

    /**
     * Adds a custom validation function.
     */
    external?: {
        method: Joi.ExternalValidationFunction;
        description?: string;
    };

    /**
     * Marks a key as forbidden which will not allow any value except undefined. Used to explicitly forbid keys.
     */
    forbidden?: true;

    /**
     * Overrides the key name in error messages.
     */
    label?: string;

    /**
     * Attaches metadata to the key.
     */
    meta?: object;

    /**
     * Annotates the key
     */
    note?: string | string[];

    /**
     * Overrides the global validate() options for the current key and any sub-key.
     */
    prefs?: Joi.ValidationOptions;

    /**
     * Sets the presence mode for the schema.
     */
    presence?: PresenceMode;

    /**
     * Outputs the original untouched value instead of the casted value.
     */
    raw?: true;

    /**
     * Marks a schema as required which will not allow undefined as value. All keys are optional by default.
     */
    required?: true;

    /**
     * Annotates the key
     */
    tag?: string | string[];

    /**
     * Annotates the key with an unit name.
     */
    unit?: string;

    /**
     * Adds the provided values into the allowed whitelist and marks them as the only valid values allowed.
     */
    valid?: string | string[];

}

export const extendAnySchema = function(schema: Joi.Schema, type: Schema): Joi.Schema{

    let base = schema;

    if(typeof type !== "string"){

        base = convert.allow(base, type.allow);
        base = convert.custom(base, type.custom);
        base = convert.default(base, type.default);
        base = convert.description(base, type.description);
        base = convert.empty(base, type.empty);
        base = convert.error(base, type.error);
        base = convert.example(base, type.example);
        base = convert.external(base, type.external);
        base = convert.forbidden(base, type.forbidden);
        base = convert.label(base, type.label);
        base = convert.meta(base, type.meta);
        base = convert.note(base, type.note);
        base = convert.prefs(base, type.prefs);
        base = convert.presence(base, type.presence);
        base = convert.raw(base, type.raw);
        base = convert.required(base, type.required);
        base = convert.tag(base, type.tag);
        base = convert.unit(base, type.unit);
        base = convert.valid(base, type.valid);
        base = convert.valid(base, type.equal);

    }

    return base;

};

export const anySchemaToJoi = function(type: Schema): Joi.Schema{

    return extendAnySchema(Joi.any(), type);

};

