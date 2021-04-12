

import "jasmine";

import Joi from "joi";

import { EqualityTest } from "./utils/test";
import * as object from "./object";


class Test extends EqualityTest<object.ObjectSchema, typeof object.objectSchemaToJoi>{}


const method = object.objectSchemaToJoi;
const name = "objectSchemaToJoi";


describe("{ objectSchemaToJoi }", () => {

    it("objectSchemaToJoi is defined", () => {
        expect(object.objectSchemaToJoi).toBeDefined();
    });

});

new Test(`${ name }`, method, [
    [
        Joi.object(),
        { type: "object" }
    ],
    [
        Joi.object(),
        "object"
    ],
    [
        Joi.object({
            test: Joi.string()
        }).required(),
        {
            keys: {
                test: "string"
            },
            required: true,
            type: "object"
        }
    ]
]).run();

new Test(`${ name }<required,error>`, method, [
    [
        Joi.object({
            testa: Joi.any(),
            testb: Joi.any()
        }).required().error(new Error("custom error")),
        {
            error: new Error("custom error"),
            keys: {
                testa: "any",
                testb: "any"
            },
            required: true,
            type: "object"
        }
    ]
]).run();


new Test(`${ name }<and>`, method, [
    [
        Joi.object({
            testa: Joi.any(),
            testb: Joi.any()
        }).and("a", "b"),
        {
            and: ["a", "b"],
            keys: {
                testa: "any",
                testb: "any"
            },
            type: "object"
        }
    ],
    [
        Joi.object({
            testa: Joi.any(),
            testb: Joi.any()
        }).and("a", "b", {
            separator: "."
        }),
        {
            and: {
                peers: ["a", "b"],
                separator: "."
            },
            keys: {
                testa: "any",
                testb: "any"
            },
            type: "object"
        }
    ]
]).run();

new Test(`${ name }<assert>`, method, [
    [
        Joi.object({
            testa: {
                testb: Joi.string(),
                testc: Joi.number()
            },
            testd: {
                teste: Joi.any()
            }
        }).assert(
            ".testd.teste",
            Joi.ref("testa.testc"),
            "equal to testa.testc"
        ),
        {
            assert: {
                message: "equal to testa.testc",
                reference: ".testd.teste",
                schema: {
                    key: "testa.testc",
                    type: "reference"
                }
            },
            keys: {
                testa: {
                    keys: {
                        testb: "string",
                        testc: "number"
                    },
                    type: "object"
                },
                testd: {
                    keys: {
                        teste: "any"
                    },
                    type: "object"
                }
            },
            type: "object"
        }
    ]
]).run();

new Test(`${ name }<instance>`, method, [
    [
        Joi.object().instance(RegExp),
        {
            instance: RegExp,
            type: "object"
        }
    ],
    [
        Joi.object().instance(RegExp, "regex message"),
        {
            instance: {
                constructor: RegExp,
                name: "regex message"
            },
            type: "object"
        }
    ]
]).run();

new Test(`${ name }<length>`, method, [
    [
        Joi.object().length(1),
        {
            length: 1,
            type: "object"
        }
    ]
]).run();

new Test(`${ name }<max>`, method, [
    [
        Joi.object().max(1),
        {
            max: 1,
            type: "object"
        }
    ]
]).run();

new Test(`${ name }<min>`, method, [
    [
        Joi.object().min(1),
        {
            min: 1,
            type: "object"
        }
    ]
]).run();

new Test(`${ name }<nand>`, method, [
    [
        Joi.object({
            testa: Joi.any(),
            testb: Joi.any()
        }).nand("a", "b"),
        {
            keys: {
                testa: "any",
                testb: "any"
            },
            nand: ["a", "b"],
            type: "object"
        }
    ]
]).run();

new Test(`${ name }<or>`, method, [
    [
        Joi.object({
            testa: Joi.any(),
            testb: Joi.any()
        }).or("a", "b"),
        {
            keys: {
                testa: "any",
                testb: "any"
            },
            or: ["a", "b"],
            type: "object"
        }
    ]
]).run();

new Test(`${ name }<oxor>`, method, [
    [
        Joi.object({
            testa: Joi.any(),
            testb: Joi.any()
        }).oxor("a", "b"),
        {
            keys: {
                testa: "any",
                testb: "any"
            },
            oxor: ["a", "b"],
            type: "object"
        }
    ]
]).run();

new Test(`${ name }<pattern>`, method, [
    [
        Joi.object({
            testa: Joi.string()
        }).pattern(/\w\d/u, Joi.boolean()),
        {
            keys: {
                testa: "string"
            },
            pattern: {
                match: /\w\d/u,
                schema: "boolean"
            },
            type: "object"
        }
    ]
]).run();

new Test(`${ name }<regex>`, method, [
    [
        Joi.object().regex(),
        {
            regex: true,
            type: "object"
        }
    ]
]).run();

new Test(`${ name }<rename>`, method, [

    [
        Joi.object({
            testa: Joi.string()
        }).rename("testb", "testa"),
        {
            keys: {
                testa: "string"
            },
            rename: {
                from: "testb",
                to: "testa"
            },
            type: "object"
        }
    ],
    [
        Joi.object({
            testa: Joi.string()
        })
        .rename("testb", "testa")
        .rename("testD", "testC"),
        {
            keys: {
                testa: "string"
            },
            rename: [
                {
                    from: "testb",
                    to: "testa"
                },
                {
                    from: "testD",
                    to: "testC"
                }
            ],
            type: "object"
        }
    ],
    [
        Joi.object({
            testA: Joi.string()
        })
        .rename("test_a", "testA"),
        {
            keys: {
                testA: "string"
            },
            type: "object"
        }
    ],
    [
        Joi.object({
            testA: Joi.string()
        })
        .rename("test_a", "testA"),
        {
            keys: {
                testA: "string"
            },
            rename: [
                {
                    from: "test_a",
                    to: "testA"
                }
            ],
            type: "object"
        }
    ]
]).run();

new Test(`${ name }<with>`, method, [
    [
        Joi.object({
            testa: Joi.string(),
            testb: Joi.string()
        }).with("testa", "testb"),
        {
            keys: {
                testa: "string",
                testb: "string"
            },
            type: "object",
            with: {
                key: "testa",
                peers: "testb"
            }
        }
    ]
]).run();
