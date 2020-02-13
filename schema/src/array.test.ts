

import "jasmine";

import Joi from "@hapi/joi";

import { EqualityTest } from "./utils/test";
import * as array from "./array";


class Test extends EqualityTest<array.ArraySchema, typeof array.arraySchemaToJoi>{}


const method = array.arraySchemaToJoi;
const name = "arraySchemaToJoi";


describe(`{ ${ name } }`, () => {

    it(`${ name } is defined`, () => {
        expect(method).toBeDefined();
    });

});

new Test(`${ name }`, method, [
    [
        Joi.array(),
        { type: "array" }
    ],
    [
        Joi.array(),
        "array"
    ],
    [
        Joi.array().required(),
        {
            required: true,
            type: "array"
        }
    ]
]).run();

new Test(`${ name }<has>`, method, [
    [
        Joi.array().has(Joi.string()),
        {
            has: "string",
            type: "array"
        }
    ]
]).run();

new Test(`${ name }<items>`, method, [
    [
        Joi.array().items(Joi.string()),
        {
            items: "string",
            type: "array"
        }
    ],
    [
        Joi.array().items(Joi.string(), Joi.number().required()),
        {
            items: [
                "string",
                {
                    required: true,
                    type: "number"
                }
            ],
            type: "array"
        }
    ]
]).run();

new Test(`${ name }<length>`, method, [
    [
        Joi.array().length(1),
        {
            length: 1,
            type: "array"
        }
    ]
]).run();

new Test(`${ name }<max>`, method, [
    [
        Joi.array().max(1),
        {
            max: 1,
            type: "array"
        }
    ]
]).run();

new Test(`${ name }<min>`, method, [
    [
        Joi.array().min(1),
        {
            min: 1,
            type: "array"
        }
    ]
]).run();

new Test(`${ name }<ordered>`, method, [
    [
        Joi.array().ordered(Joi.string()),
        {
            ordered: "string",
            type: "array"
        }
    ],
    [
        Joi.array().ordered(Joi.string(), Joi.number().required()),
        {
            ordered: [
                "string",
                {
                    required: true,
                    type: "number"
                }
            ],
            type: "array"
        }
    ]
]).run();

new Test(`${ name }<single>`, method, [
    [
        Joi.array().single(),
        {
            single: true,
            type: "array"
        }
    ]
]).run();

new Test(`${ name }<sort>`, method, [
    [
        Joi.array().sort(),
        {
            sort: true,
            type: "array"
        }
    ],
    [
        Joi.array().sort({
            by: "key",
            order: "ascending"
        }),
        {
            sort: {
                by: "key",
                order: "ascending"
            },
            type: "array"
        }
    ]
]).run();

new Test(`${ name }<sparse>`, method, [
    [
        Joi.array().sparse(),
        {
            sparse: true,
            type: "array"
        }
    ],
    [
        Joi.array().sparse(false),
        {
            sparse: false,
            type: "array"
        }
    ]
]).run();

new Test(`${ name }<unique>`, method, [
    [
        Joi.array().unique(),
        {
            type: "array",
            unique: true
        }
    ],
    [
        Joi.array().unique("x"),
        {
            type: "array",
            unique: "x"
        }
    ],
    [
        Joi.array().unique("x", {
            ignoreUndefined: true,
            separator: ","
        }),
        {
            type: "array",
            unique: {
                comparator: "x",
                ignoreUndefined: true,
                separator: ","
            }
        }
    ]
]).run();
