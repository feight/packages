

import "jasmine";

import { config } from "..";


describe("{ config.htmlmin }", () => {

    it("config.htmlmin is defined", () => {
        expect(config.htmlmin).toBeDefined();
    });

    it("config.htmlmin.options is defined", () => {
        expect(config.htmlmin.options).toBeDefined();
    });

});
