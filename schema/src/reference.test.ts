

import "jasmine";

import Joi from "joi";

import * as reference from "./reference";


const type = "reference";


describe("{ referenceToJoi }", () => {

    it("referenceToJoi is defined", () => {
        expect(reference.referenceToJoi).toBeDefined();
    });

    const equalities: [Joi.Reference, reference.Reference][] = [
        [
            Joi.ref("a"),
            {
                key: "a",
                type
            }
        ],
        [
            Joi.ref("a", {
                separator: ","
            }),
            {
                key: "a",
                separator: ",",
                type
            }
        ]
    ];

    for(const [joi, json] of equalities){

        it(`referenceToJoi(${ JSON.stringify(json) }) returns ${ JSON.stringify(joi) }`, () => {
            expect(reference.referenceToJoi(json)).toEqual(joi);
        });

    }

});

