

import "jasmine";

import Joi from "joi";

import { EqualityTest } from "./utils/test";
import * as date from "./date";


class Test extends EqualityTest<date.DateSchema, typeof date.dateSchemaToJoi>{}


const method = date.dateSchemaToJoi;
const name = "dateSchemaToJoi";


describe("{ dateSchemaToJoi }", () => {

    it("dateSchemaToJoi is defined", () => {
        expect(date.dateSchemaToJoi).toBeDefined();
    });

});

new Test(`${ name }`, method, [
    [
        Joi.date(),
        { type: "date" }
    ],
    [
        Joi.date(),
        "date"
    ],
    [
        Joi.date().required(),
        {
            required: true,
            type: "date"
        }
    ]
]).run();

new Test(`${ name }<greater>`, method, [
    [
        Joi.date().greater("now"),
        {
            greater: "now",
            type: "date"
        }
    ]
]).run();

new Test(`${ name }<less>`, method, [
    [
        Joi.date().less("now"),
        {
            less: "now",
            type: "date"
        }
    ]
]).run();

new Test(`${ name }<max>`, method, [
    [
        Joi.date().max("now"),
        {
            max: "now",
            type: "date"
        }
    ]
]).run();

new Test(`${ name }<min>`, method, [
    [
        Joi.date().min("now"),
        {
            min: "now",
            type: "date"
        }
    ]
]).run();

new Test(`${ name }<timestamp>`, method, [
    [
        Joi.date().timestamp(),
        {
            timestamp: true,
            type: "date"
        }
    ],
    [
        Joi.date().timestamp("unix"),
        {
            timestamp: "unix",
            type: "date"
        }
    ]
]).run();
