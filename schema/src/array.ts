

import Joi from "@hapi/joi";
import JSON5 from "json5";

import {
    extendAnySchema,
    AnySchemaDefinition
} from "./any";
import {
    referenceToJoi,
    Reference
} from "./reference";

import {
    Schema,
    schemaToJoi
} from ".";

/*
 * Create an extension of Joi.array that coerces strings into arrays since this
 * is no longer the default behaviour.
 */
const extendedJoi = Joi.extend(
    {
        base: Joi.array(),
        coerce: {
            from: "string",
            method(value: string): Joi.CoerceResult{

                try{

                    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- It's expected that this is of type any
                    return { value: JSON.parse(value) as any[] };

                }catch{

                    try{

                        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- It's expected that this is of type any
                        return { value: JSON5.parse(value) as any[] };

                    }catch{

                        return { value };

                    }

                }

            }
        },
        type: "array"
    }
) as Joi.Root;

const convert = {
    has(schema: Joi.ArraySchema, value?: ArraySchemaDefinition["has"]): Joi.ArraySchema{
        return typeof value === "undefined" ? schema : schema.has(schemaToJoi(value));
    },
    items(schema: Joi.ArraySchema, value?: ArraySchemaDefinition["items"]): Joi.ArraySchema{
        return value ? schema.items(...(Array.isArray(value) ? value : [value]).map((item) => schemaToJoi(item))) : schema;
    },
    length(schema: Joi.ArraySchema, value?: ArraySchemaDefinition["length"]): Joi.ArraySchema{
        return typeof value === "undefined" ? schema : schema.length(typeof value === "number" ? value : referenceToJoi(value));
    },
    max(schema: Joi.ArraySchema, value?: ArraySchemaDefinition["max"]): Joi.ArraySchema{
        return typeof value === "undefined" ? schema : schema.max(typeof value === "number" ? value : referenceToJoi(value));
    },
    min(schema: Joi.ArraySchema, value?: ArraySchemaDefinition["min"]): Joi.ArraySchema{
        return typeof value === "undefined" ? schema : schema.min(typeof value === "number" ? value : referenceToJoi(value));
    },
    ordered(schema: Joi.ArraySchema, value?: ArraySchemaDefinition["ordered"]): Joi.ArraySchema{
        return value ? schema.ordered(...(Array.isArray(value) ? value : [value]).map((item) => schemaToJoi(item))) : schema;
    },
    single(schema: Joi.ArraySchema, value?: ArraySchemaDefinition["single"]): Joi.ArraySchema{
        return value ? schema.single() : schema;
    },
    sort(schema: Joi.ArraySchema, value?: ArraySchemaDefinition["sort"]): Joi.ArraySchema{

        if(typeof value !== "undefined" && value !== false){

            const sortOptions = typeof value === "boolean" ? true : {
                ...value,
                by: value.by && typeof value.by !== "string" ? referenceToJoi(value.by) : value.by
            };

            return schema.sort(sortOptions === true ? undefined : sortOptions);

        }

        return schema;

    },
    sparse(schema: Joi.ArraySchema, value?: ArraySchemaDefinition["sparse"]): Joi.ArraySchema{

        if(typeof value !== "undefined"){

            return value ? schema.sparse() : schema.sparse(false);

        }

        return schema;

    },
    unique(schema: Joi.ArraySchema, value?: ArraySchemaDefinition["unique"]): Joi.ArraySchema{

        if(typeof value !== "undefined"){

            if(value === true){

                return schema.unique();

            }

            const comparator = typeof value === "string" ? value : value.comparator;

            return schema.unique(comparator, typeof value === "string" ? undefined : {
                ignoreUndefined: value.ignoreUndefined,
                separator: value.separator
            });

        }

        return schema;

    }
};


export type ArraySchema = "array" | ArraySchemaDefinition;

export interface ArraySchemaDefinition extends AnySchemaDefinition{

    type: "array";

    default?: typeof Array;

    /**
     * Verifies that an assertion passes for at least one item in the array, where:
     * `schema` - the validation rules required to satisfy the assertion. If the `schema` includes references, they are resolved against
     * the array item being tested, not the value of the `reference` target.
     */
    has?: Schema;

    /**
     * Schema or array the schemas allowed for the array values.
     * If a given schema is 'required' then there must be a matching item in the array.
     * If a schema is 'forbidden' then it cannot appear in the array.
     * Required items can be added multiple times to signify that multiple items must be found.
     * Errors will contain the number of items that didn't match.
     * Any unmatched item having a label will be mentioned explicitly.
     */
    items?: Schema | Schema[];

    /**
     * Specifies the exact number of items in the array.
     */
    length?: number | Reference;

    /**
     * Specifies the maximum number of items in the array.
     */
    max?: number | Reference;

    /**
     * Specifies the minimum number of items in the array.
     */
    min?: number | Reference;

    /**
     * Lists the types in sequence order for the array values where:
     * A schema object to validate against each array item in sequence order. type can be multiple values passed as individual arguments.
     * If a given type is 'required' then there must be a matching item with the same index position in the array.
     * Errors will contain the number of items that didn't match.
     * Any unmatched item having a label will be mentioned explicitly.
     */
    ordered?: Schema | Schema[];

    /**
     * Allow single values to be checked against rules as if it were provided as an array.
     * enabled can be used with a falsy value to go back to the default behavior.
     */
    single?: true;

    /**
     * Sorts the array by given order.
     */
    sort?: boolean | {

        /**
         * @default "ascending"
         */
        order?: "ascending" | "descending";
        by?: string | Reference;
    };

    /**
     * Allow this array to be sparse.
     * enabled can be used with a falsy value to go back to the default behavior.
     */
    sparse?: boolean;

    /**
     * Requires the array values to be unique.
     * Remember that if you provide a custom comparator function,
     * different types can be passed as parameter depending on the rules you set on items.
     * Be aware that a deep equality is performed on elements of the array having a type of object,
     * a performance penalty is to be expected for this kind of operation.
     */
    unique?: true | string | {
        comparator: string | Joi.ComparatorFunction;
        ignoreUndefined: Joi.ArrayUniqueOptions["ignoreUndefined"];
        separator: Joi.HierarchySeparatorOptions["separator"];
    };
}


export const arraySchemaToJoi = function(type: ArraySchema): Joi.AnySchema{

    let schema = extendedJoi.array();

    if(type !== "array"){

        schema = convert.has(schema, type.has);
        schema = convert.items(schema, type.items);
        schema = convert.length(schema, type.length);
        schema = convert.max(schema, type.max);
        schema = convert.min(schema, type.min);
        schema = convert.ordered(schema, type.ordered);
        schema = convert.single(schema, type.single);
        schema = convert.sort(schema, type.sort);
        schema = convert.sparse(schema, type.sparse);
        schema = convert.unique(schema, type.unique);

    }

    return extendAnySchema(schema, type);

};

