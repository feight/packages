

import "jasmine";

import { config } from "..";


describe("{ config.modernizr }", () => {

    it("config.modernizr is defined", () => {
        expect(config.modernizr).toBeDefined();
    });

    it("config.modernizr.config is defined", () => {
        expect(config.modernizr.config).toBeDefined();
    });

    it("config.modernizr.config['feature-detects'] is defined", () => {
        expect(config.modernizr.config["feature-detects"]).toBeDefined();
    });

});
