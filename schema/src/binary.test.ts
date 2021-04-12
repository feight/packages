

import "jasmine";

import Joi from "joi";

import { EqualityTest } from "./utils/test";
import * as binary from "./binary";


class Test extends EqualityTest<binary.BinarySchema, typeof binary.binarySchemaToJoi>{}


const method = binary.binarySchemaToJoi;
const name = "binarySchemaToJoi";


describe(`{ ${ name } }`, () => {

    it(`${ name } is defined`, () => {
        expect(binary.binarySchemaToJoi).toBeDefined();
    });

});

new Test(`${ name }`, method, [
    [
        Joi.binary(),
        { type: "binary" }
    ],
    [
        Joi.binary(),
        "binary"
    ],
    [
        Joi.binary().required(),
        {
            required: true,
            type: "binary"
        }
    ]
]).run();

new Test(`${ name }<encoding>`, method, [
    [
        Joi.binary().encoding("base64"),
        {
            encoding: "base64",
            type: "binary"
        }
    ]
]).run();

new Test(`${ name }<length>`, method, [
    [
        Joi.binary().length(1),
        {
            length: 1,
            type: "binary"
        }
    ]
]).run();

new Test(`${ name }<max>`, method, [
    [
        Joi.binary().max(1),
        {
            max: 1,
            type: "binary"
        }
    ]
]).run();

new Test(`${ name }<min>`, method, [
    [
        Joi.binary().min(1),
        {
            min: 1,
            type: "binary"
        }
    ]
]).run();
