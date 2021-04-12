

import "jasmine";

import Joi from "joi";

import { EqualityTest } from "./utils/test";
import * as number from "./number";


class Test extends EqualityTest<number.NumberSchema, typeof number.numberSchemaToJoi>{}


const method = number.numberSchemaToJoi;
const name = "numberSchemaToJoi";


describe("{ numberSchemaToJoi }", () => {

    it("numberSchemaToJoi is defined", () => {
        expect(number.numberSchemaToJoi).toBeDefined();
    });

});

new Test(`${ name }`, method, [
    [
        Joi.number(),
        { type: "number" }
    ],
    [
        Joi.number(),
        "number"
    ],
    [
        Joi.number().required(),
        {
            required: true,
            type: "number"
        }
    ]
]).run();

new Test(`${ name }<greater>`, method, [
    [
        Joi.number().greater(1),
        {
            greater: 1,
            type: "number"
        }
    ],
    [
        Joi.number().greater(Joi.ref("num")),
        {
            greater: {
                key: "num",
                type: "reference"
            },
            type: "number"
        }
    ]
]).run();

new Test(`${ name }<integer>`, method, [
    [
        Joi.number().integer(),
        {
            integer: true,
            type: "number"
        }
    ]
]).run();

new Test(`${ name }<less>`, method, [
    [
        Joi.number().less(1),
        {
            less: 1,
            type: "number"
        }
    ]
]).run();

new Test(`${ name }<max>`, method, [
    [
        Joi.number().max(1),
        {
            max: 1,
            type: "number"
        }
    ]
]).run();

new Test(`${ name }<min>`, method, [
    [
        Joi.number().min(1),
        {
            min: 1,
            type: "number"
        }
    ]
]).run();

new Test(`${ name }<negative>`, method, [
    [
        Joi.number().negative(),
        {
            negative: true,
            type: "number"
        }
    ]
]).run();

new Test(`${ name }<port>`, method, [
    [
        Joi.number().port(),
        {
            port: true,
            type: "number"
        }
    ]
]).run();

new Test(`${ name }<positive>`, method, [
    [
        Joi.number().positive(),
        {
            positive: true,
            type: "number"
        }
    ]
]).run();

new Test(`${ name }<precision>`, method, [
    [
        Joi.number().precision(1),
        {
            precision: 1,
            type: "number"
        }
    ]
]).run();

new Test(`${ name }<sign>`, method, [
    [
        Joi.number().sign("negative"),
        {
            sign: "negative",
            type: "number"
        }
    ]
]).run();

new Test(`${ name }<unsafe>`, method, [
    [
        Joi.number().unsafe(true),
        {
            type: "number",
            unsafe: true
        }
    ],
    [
        Joi.number().unsafe(false),
        {
            type: "number",
            unsafe: false
        }
    ]
]).run();
