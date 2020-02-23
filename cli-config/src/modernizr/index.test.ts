

import "jasmine";

import { defaults } from "../defaults";

import { config } from "..";


describe("{ config.modernizr }", () => {

    it("config.modernizr is defined", () => {
        expect(config.modernizr).toBeDefined();
    });

    it("config.modernizr.addFeatures is defined", () => {
        expect(config.modernizr.addFeatures).toBeDefined();
    });

    it("config.modernizr.addFeatures defaults correctly", () => {
        expect(config.modernizr.addFeatures).toEqual(defaults.modernizr.addFeatures);
    });

});
