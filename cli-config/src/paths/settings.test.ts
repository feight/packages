

import "jasmine";

import { defaults } from "../defaults";

import { config } from "..";


describe("{ config.paths.settings }", () => {

    it("config.paths.settings is defined", () => {
        expect(config.paths.settings).toBeDefined();
    });

    it("config.paths.settings.environments is defined", () => {
        expect(config.paths.settings.environments).toBeDefined();
    });

    it("config.paths.settings.environments defaults correctly", () => {
        expect(config.paths.settings.environments).toEqual(defaults.paths.settings.environments);
    });

    it("config.paths.settings.handlers is defined", () => {
        expect(config.paths.settings.handlers).toBeDefined();
    });

    it("config.paths.settings.handlers defaults correctly", () => {
        expect(config.paths.settings.handlers).toEqual(defaults.paths.settings.handlers);
    });

});
