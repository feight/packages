

import Joi from "@hapi/joi";
import JSON5 from "json5";

import {
    extendAnySchema,
    AnySchemaDefinition
} from "./any";
import {
    Reference,
    referenceToJoi
} from "./reference";

import {
    Schema,
    SchemaLike,
    schemaLikeToJoi,
    SchemaMap
} from ".";


type Operator = string[] | {
    peers: string[];

    /**
     * Overrides the default `.` hierarchy separator. Set to false to treat the key as a literal value.
     *
     * @default '.'
     */
    separator?: Joi.HierarchySeparatorOptions["separator"];
};

interface WithWithout{
    key: string;
    peers: string | string[];
    separator?: Joi.HierarchySeparatorOptions["separator"];
}

interface Rename {
    from: string;
    to: string;
    options?: Joi.RenameOptions;
}

/*
 * Create an extension of Joi.object that coerces strings into objects since
 * this is no longer the default behaviour.
 */
const extendedJoi = Joi.extend(
    {
        base: Joi.object(),
        coerce: {
            from: "string",
            method(value: string): Joi.CoerceResult{

                try{

                    return { value: JSON.parse(value) };

                }catch(error){

                    try{

                        return { value: JSON5.parse(value) };

                    }catch(error2){

                        return { value };

                    }

                }

            }
        },
        type: "object"
    }
);

const bindOperator = function(
    schema: Joi.ObjectSchema,
    type: Operator,
    operator:
        "and" |
        "nand" |
        "or" |
        "oxor" |
        "xor"
): Joi.ObjectSchema{

    const config = type;

    const peers = Array.isArray(config) ? config : config.peers;
    const separator = Array.isArray(config) ? undefined : config.separator;

    if(separator){

        return schema[operator](...peers, { separator });

    }

    return schema[operator](...peers);

};

const bindWithWithout = function(
    schema: Joi.ObjectSchema,
    type: WithWithout,
    operator:
        "with" |
        "without"
): Joi.ObjectSchema{

    const key = type.key;
    const peers = type.peers;
    const separator = Array.isArray(type) ? undefined : type.separator;

    if(separator){

        return schema[operator](key, peers, { separator });

    }

    return schema[operator](key, peers);

};

const getRenames = function(type: ObjectSchemaDefinition): Rename[]{

    let renames: Rename[] = [];

    if(type.rename){

        renames = renames.concat(Array.isArray(type.rename) ? type.rename : [type.rename]);

    }

    if(type.keys){

        Object.keys(type.keys).forEach((key) => {

            const from = key.replace(/([a-z])([A-Z])/gu, "$1_$2").toLowerCase();

            if(from !== key){

                renames.push({
                    from,
                    to: key
                });

            }

        });

    }

    // Filter out any renames with duplicate from values
    const uniqueRenames: Rename[] = [];
    const lookupObject: { [ from: string ]: Rename } = {};

    renames.forEach((rename: Rename) => {
        lookupObject[rename.from] = rename;
    });

    Object.keys(lookupObject).forEach((key) => {
        uniqueRenames.push(lookupObject[key]);
    });

    return uniqueRenames;

};

const typeMapToJoi = function(map: SchemaMap): Joi.SchemaMap{

    return Object.keys(map).reduce((result: Joi.SchemaMap, key): Joi.SchemaMap => {
        // Reassignment makes sense in this case
        // eslint-disable-next-line no-param-reassign
        result[key] = schemaLikeToJoi(map[key]);
        return result;
    }, {});

};

const convert = {
    and(schema: Joi.ObjectSchema, value?: ObjectSchemaDefinition["and"]): Joi.ObjectSchema{
        return value ? bindOperator(schema, value, "and") : schema;
    },
    append(schema: Joi.ObjectSchema, value?: ObjectSchemaDefinition["append"]): Joi.ObjectSchema{
        return value ? schema.append(typeMapToJoi(value)) : schema;
    },
    assert(schema: Joi.ObjectSchema, value?: ObjectSchemaDefinition["assert"]): Joi.ObjectSchema{

        if(value){

            const assertReference = typeof value.reference === "string" ? value.reference : referenceToJoi(value.reference);
            const assertSchema = schemaLikeToJoi(value.schema);

            return schema.assert(assertReference, assertSchema, value.message);

        }

        return schema;

    },
    instance(schema: Joi.ObjectSchema, value?: ObjectSchemaDefinition["instance"]): Joi.ObjectSchema{

        if(value){

            const constructor = value instanceof Function ? value : value.constructor;
            const name = value instanceof Function ? undefined : value.name;

            return schema.instance(constructor, name);

        }

        return schema;

    },
    keys(schema: Joi.ObjectSchema, value?: ObjectSchemaDefinition["keys"]): Joi.ObjectSchema{

        if(value){

            const objectSchema = typeMapToJoi(value);

            return schema.keys(objectSchema);

        }

        return schema;

    },
    length(schema: Joi.ObjectSchema, value?: ObjectSchemaDefinition["length"]): Joi.ObjectSchema{
        return typeof value === "undefined" ? schema : schema.length(value);
    },
    max(schema: Joi.ObjectSchema, value?: ObjectSchemaDefinition["max"]): Joi.ObjectSchema{
        return typeof value === "undefined" ? schema : schema.max(typeof value === "number" ? value : referenceToJoi(value));
    },
    min(schema: Joi.ObjectSchema, value?: ObjectSchemaDefinition["min"]): Joi.ObjectSchema{
        return typeof value === "undefined" ? schema : schema.min(typeof value === "number" ? value : referenceToJoi(value));
    },
    nand(schema: Joi.ObjectSchema, value?: ObjectSchemaDefinition["nand"]): Joi.ObjectSchema{
        return value ? bindOperator(schema, value, "nand") : schema;
    },
    or(schema: Joi.ObjectSchema, value?: ObjectSchemaDefinition["or"]): Joi.ObjectSchema{
        return value ? bindOperator(schema, value, "or") : schema;
    },
    oxor(schema: Joi.ObjectSchema, value?: ObjectSchemaDefinition["oxor"]): Joi.ObjectSchema{
        return value ? bindOperator(schema, value, "oxor") : schema;
    },
    pattern(schema: Joi.ObjectSchema, value?: ObjectSchemaDefinition["pattern"]): Joi.ObjectSchema{

        if(value){

            const match = value.match instanceof RegExp ? value.match : schemaLikeToJoi(value.match);
            const options = typeof value.options === "undefined" ? undefined : {
                ...value.options,
                matches: schemaLikeToJoi(value.options.matches)
            };

            return schema.pattern(match, schemaLikeToJoi(value.schema), options);

        }

        return schema;

    },
    regex(schema: Joi.ObjectSchema, value?: ObjectSchemaDefinition["regex"]): Joi.ObjectSchema{
        // This is chilled because @types/hapi__joi is out of date
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
        return typeof value === "undefined" ? schema : schema.regex(true);
    },
    rename(schema: Joi.ObjectSchema, value?: ObjectSchemaDefinition["rename"]): Joi.ObjectSchema{

        if(typeof value !== "undefined"){

            const renames: Rename[] = Array.isArray(value) ? value : [value];

            let base = schema;

            renames.forEach(({
                from,
                to,
                options
            }) => {

                base = base.rename(from, to, options);

            });

            return base;

        }

        return schema;

    },
    with(schema: Joi.ObjectSchema, value?: ObjectSchemaDefinition["with"]): Joi.ObjectSchema{
        return value ? bindWithWithout(schema, value, "with") : schema;
    },
    without(schema: Joi.ObjectSchema, value?: ObjectSchemaDefinition["without"]): Joi.ObjectSchema{
        return value ? bindWithWithout(schema, value, "without") : schema;
    },
    xor(schema: Joi.ObjectSchema, value?: ObjectSchemaDefinition["xor"]): Joi.ObjectSchema{
        return value ? bindOperator(schema, value, "xor") : schema;
    }
};


export type ObjectSchema = "object" | ObjectSchemaDefinition;

export interface ObjectSchemaDefinition extends AnySchemaDefinition{

    type: "object";

    // This type supports any value
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    default?: Record<string, any>;

    /**
     * Defines an all-or-nothing relationship between keys where if one of the
     * peers is present, all of them are required as well.
     *
     * Optional settings must be the last argument.
     */
    and?: Operator;

    /**
     * Appends the allowed object keys. If schema is null, undefined, or {}, no
     * changes will be applied.
     */
    append?: Record<string, Schema>;

    /**
     * Verifies an assertion where.
     */
    assert?: {
        reference: string | Reference;
        schema: SchemaLike;
        message?: string;
    };

    /**
     * Requires the object to be an instance of a given constructor.
     */
    instance?: Function | {

        /**
         * The constructor function that the object must be an instance of.
         */
        constructor: Function;

        /**
         * An alternate name to use in validation errors. This is useful when the
         * constructor function does not have a name.
         */
        name?: string;
    };

    /**
     * Sets or extends the allowed object keys.
     */
    keys?: SchemaMap;

    /**
     * Specifies the exact number of keys in the object.
     */
    length?: number;

    /**
     * Specifies the maximum number of keys in the object.
     */
    max?: number | Reference;

    /**
     * Specifies the minimum number of keys in the object.
     */
    min?: number | Reference;

    /**
     * Defines a relationship between keys where not all peers can be present
     * at the same time.
     */
    nand?: Operator;

    /**
     * Defines a relationship between keys where one of the peers is required
     * (and more than one is allowed).
     */
    or?: Operator;

    /**
     * Defines an exclusive relationship between a set of keys where only one is
     * allowed but none are required.
     */
    oxor?: Operator;

    /**
     * Specify validation rules for unknown keys matching a pattern.
     */
    pattern?: {

        /**
         * A pattern that can be either a regular expression or a schema that
         * will be tested against the unknown key names
         */
        match: RegExp | SchemaLike;

        /**
         * The schema object matching keys must validate against
         */
        schema: SchemaLike;
        options?: {
            fallthrough?: boolean;
            matches: SchemaLike | Reference;
        };
    };

    /**
     * Requires the object to be a RegExp object.
     */
    regex?: true;

    /**
     * Renames a key to another name (deletes the renamed key).
     */
    rename?: Rename | Rename[];

    /**
     * Requires the presence of other keys whenever the specified key is present.
     */
    with?: WithWithout;

    /**
     * Forbids the presence of other keys whenever the specified is present.
     */
    without?: WithWithout;

    /**
     * Defines an exclusive relationship between a set of keys. one of them is
     * required but not at the same time.
     */
    xor?: Operator;

}

export const objectSchemaToJoi = function(type: ObjectSchema): Joi.AnySchema{

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    let schema = extendedJoi.object();

    if(type !== "object"){

        const renames = getRenames(type);

        schema = convert.and(schema, type.and);
        schema = convert.append(schema, type.append);
        schema = convert.assert(schema, type.assert);
        schema = convert.instance(schema, type.instance);
        schema = convert.keys(schema, type.keys);
        schema = convert.length(schema, type.length);
        schema = convert.max(schema, type.max);
        schema = convert.min(schema, type.min);
        schema = convert.nand(schema, type.nand);
        schema = convert.or(schema, type.or);
        schema = convert.oxor(schema, type.oxor);
        schema = convert.pattern(schema, type.pattern);
        schema = convert.regex(schema, type.regex);
        schema = convert.rename(schema, renames);
        schema = convert.xor(schema, type.xor);
        schema = convert.with(schema, type.with);
        schema = convert.without(schema, type.without);

    }

    return extendAnySchema(schema, type);

};

