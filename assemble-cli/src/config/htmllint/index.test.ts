

import "jasmine";

import { config } from "..";


describe("{ config.htmllint }", () => {

    it("config.htmllint is defined", () => {
        expect(config.htmllint).toBeDefined();
    });

    it("config.htmllint.options is defined", () => {
        expect(config.htmllint.options).toBeDefined();
    });

});
