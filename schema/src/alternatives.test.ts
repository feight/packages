

import "jasmine";

import Joi from "joi";

import { EqualityTest } from "./utils/test";
import * as alternatives from "./alternatives";


class Test extends EqualityTest<alternatives.AlternativesSchema, typeof alternatives.alternativesSchemaToJoi>{}


const method = alternatives.alternativesSchemaToJoi;
const name = "alternativesSchemaToJoi";


describe(`{ ${ name } }`, () => {

    it(`${ name } is defined`, () => {
        expect(method).toBeDefined();
    });

});

new Test(`${ name }`, method, [
    [
        Joi.alternatives(),
        { type: "alternatives" }
    ],
    [
        Joi.alternatives(),
        "alternatives"
    ],
    [
        Joi.alternatives().required(),
        {
            required: true,
            type: "alternatives"
        }
    ]
]).run();

new Test(`${ name }<try>`, method, [
    [
        Joi.alternatives().try(Joi.string()),
        {
            try: "string",
            type: "alternatives"
        }
    ],
    [
        Joi.alternatives().try(Joi.string(), Joi.number()),
        {
            try: [
                "string",
                "number"
            ],
            type: "alternatives"
        }
    ],
    [
        Joi.alternatives().try(
            Joi.number(),
            Joi.array().items(Joi.number())
        ),
        {
            try: [
                "number",
                {
                    items: "number",
                    type: "array"
                }
            ],
            type: "alternatives"
        }
    ],
    [
        Joi.alternatives().try(
            Joi.number(),
            Joi.array().items(Joi.number()),
            Joi.array().items(Joi.array().items(Joi.number()))
        ),
        {
            try: [
                "number",
                {
                    items: "number",
                    type: "array"
                },
                {
                    items: {
                        items: "number",
                        type: "array"
                    },
                    type: "array"
                }
            ],
            type: "alternatives"
        }
    ]
]).run();
