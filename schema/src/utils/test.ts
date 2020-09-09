

import type Joi from "@hapi/joi";


// eslint-disable-next-line @typescript-eslint/ban-types -- This is fine, it's just for testing
export class EqualityTest<TType, TMethod extends Function>{

    method: TMethod;
    name: string;
    tests: [Joi.AnySchema, TType][];

    constructor(name: string, method: TMethod, tests: [Joi.AnySchema, TType][]){

        this.method = method;
        this.name = name;
        this.tests = tests;

    }

    run(): void{

        describe(`{ ${ this.name } }`, () => {

            this.tests.forEach(([joi, json]) => {

                it(`${ this.name }(${ JSON.stringify(json, undefined, 2) }) returns ${ JSON.stringify(joi.describe(), undefined, 2) }`, () => {

                    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access -- This is just for testing
                    expect(this.method(json).describe()).toEqual(joi.describe());

                });

            });

        });

    }

}
