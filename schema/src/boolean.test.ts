

import "jasmine";

import Joi from "@hapi/joi";

import { EqualityTest } from "./utils/test";
import * as boolean from "./boolean";


class Test extends EqualityTest<boolean.BooleanSchema, typeof boolean.booleanSchemaToJoi>{}


const method = boolean.booleanSchemaToJoi;
const name = "booleanSchemaToJoi";


describe("{ booleanSchemaToJoi }", () => {

    it("booleanSchemaToJoi is defined", () => {
        expect(boolean.booleanSchemaToJoi).toBeDefined();
    });

});

new Test(`${ name }`, method, [
    [
        Joi.boolean(),
        { type: "boolean" }
    ],
    [
        Joi.boolean(),
        "boolean"
    ],
    [
        Joi.boolean().required(),
        {
            required: true,
            type: "boolean"
        }
    ]
]).run();

new Test(`${ name }<falsy>`, method, [
    [
        Joi.boolean().falsy("NO"),
        {
            falsy: "NO",
            type: "boolean"
        }
    ],
    [
        Joi.boolean().falsy("NO", "FUCK NO"),
        {
            falsy: [
                "NO",
                "FUCK NO"
            ],
            type: "boolean"
        }
    ]
]).run();

new Test(`${ name }<truthy>`, method, [
    [
        Joi.boolean().truthy("YES"),
        {
            truthy: "YES",
            type: "boolean"
        }
    ],
    [
        Joi.boolean().truthy("YES", "FUCK YES"),
        {
            truthy: [
                "YES",
                "FUCK YES"
            ],
            type: "boolean"
        }
    ]
]).run();

new Test(`${ name }<sensitive>`, method, [
    [
        Joi.boolean().sensitive(),
        {
            sensitive: true,
            type: "boolean"
        }
    ]
]).run();


