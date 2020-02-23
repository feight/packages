

import "jasmine";


import {
    gulp,
    exec,
    kill,
    prompt,
    spawn
} from ".";


describe("{ gulp }", () => {

    it("is defined", () => {

        expect(gulp).toBeDefined();

    });

});


describe("{ exec }", () => {

    it("is defined", () => {

        expect(exec).toBeDefined();

    });

});


describe("{ kill }", () => {

    it("is defined", () => {

        expect(kill).toBeDefined();

    });

});


describe("{ prompt }", () => {

    it("is defined", () => {

        expect(prompt).toBeDefined();

    });

});


describe("{ spawn }", () => {

    it("is defined", () => {

        expect(spawn).toBeDefined();

    });

});
