

import "jasmine";

import Joi from "@hapi/joi";

import { EqualityTest } from "./utils/test";
import type * as number from "./number";
import * as any from "./any";


class ArrayEqualityTest extends EqualityTest<any.AnySchema, typeof any.anySchemaToJoi | typeof number.numberSchemaToJoi>{}


const method = any.anySchemaToJoi;
const name = "anySchemaToJoi";


describe(`{ ${ name } }`, () => {

    it(`${ name } is defined`, () => {
        expect(method).toBeDefined();
    });

});

new ArrayEqualityTest(`${ name }`, method, [
    [
        Joi.any(),
        { type: "any" }
    ],
    [
        Joi.any(),
        "any"
    ]
]).run();

new ArrayEqualityTest(`${ name }<allow>`, method, [
    [
        Joi.any().allow("test"),
        {
            allow: "test",
            type: "any"
        }
    ],
    [
        Joi.any().allow("test", "testa"),
        {
            allow: [
                "test",
                "testa"
            ],
            type: "any"
        }
    ]
]).run();

new ArrayEqualityTest(`${ name }<default>`, method, [
    [
        Joi.any().default("test"),
        {
            default: "test",
            type: "any"
        }
    ]
]).run();

new ArrayEqualityTest(`${ name }<description>`, method, [
    [
        Joi.any().description("test"),
        {
            description: "test",
            type: "any"
        }
    ]
]).run();

new ArrayEqualityTest(`${ name }<empty>`, method, [
    [
        Joi.any().empty(""),
        {
            empty: "",
            type: "any"
        }
    ]
]).run();

new ArrayEqualityTest(`${ name }<forbidden>`, method, [
    [
        Joi.any().forbidden(),
        {
            forbidden: true,
            type: "any"
        }
    ]
]).run();

new ArrayEqualityTest(`${ name }<meta>`, method, [
    [
        Joi.any().meta({
            test: "test"
        }),
        {
            meta: {
                test: "test"
            },
            type: "any"
        }
    ]
]).run();

new ArrayEqualityTest(`${ name }<note>`, method, [
    [
        Joi.any().note("wtf"),
        {
            note: "wtf",
            type: "any"
        }
    ],
    [
        Joi.any().note("wtf", "lol"),
        {
            note: [
                "wtf",
                "lol"
            ],
            type: "any"
        }
    ]
]).run();

new ArrayEqualityTest(`${ name }<required>`, method, [
    [
        Joi.any().required(),
        {
            required: true,
            type: "any"
        }
    ]
]).run();

new ArrayEqualityTest(`${ name }<tag>`, method, [
    [
        Joi.any().tag("test"),
        {
            tag: "test",
            type: "any"
        }
    ],
    [
        Joi.any().tag("test", "testa"),
        {
            tag: [
                "test",
                "testa"
            ],
            type: "any"
        }
    ]
]).run();

new ArrayEqualityTest(`${ name }<unit>`, method, [
    [
        Joi.any().unit("cm"),
        {
            type: "any",
            unit: "cm"
        }
    ]
]).run();

new ArrayEqualityTest(`${ name }<valid|equal>`, method, [
    [
        Joi.any().valid("test"),
        {
            type: "any",
            valid: "test"
        }
    ],
    [
        Joi.any().valid("test", "testa"),
        {
            type: "any",
            valid: [
                "test",
                "testa"
            ]
        }
    ],
    [
        Joi.any().equal("test"),
        {
            equal: "test",
            type: "any"
        }
    ],
    [
        Joi.any().equal("test", "testa"),
        {
            equal: [
                "test",
                "testa"
            ],
            type: "any"
        }
    ]
]).run();
