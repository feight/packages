

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

    it("config.paths.settings.glob is defined", () => {
        expect(config.paths.settings.glob).toBeDefined();
    });

    it("config.paths.settings.glob defaults correctly", () => {
        expect(config.paths.settings.glob).toEqual(defaults.paths.settings.glob);
    });

    it("config.paths.settings.handlers is defined", () => {
        expect(config.paths.settings.handlers).toBeDefined();
    });

    it("config.paths.settings.handlers defaults correctly", () => {
        expect(config.paths.settings.handlers).toEqual(defaults.paths.settings.handlers);
    });

    it("config.paths.settings.validations is defined", () => {
        expect(config.paths.settings.validations).toBeDefined();
    });

    it("config.paths.settings.validations defaults correctly", () => {
        expect(config.paths.settings.validations).toEqual(defaults.paths.settings.validations);
    });

});
