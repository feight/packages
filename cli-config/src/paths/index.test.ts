

import "jasmine";

import { defaults } from "../defaults";

import { config } from "..";


describe("{ config.paths }", () => {

    it("config.paths is defined", () => {
        expect(config.paths).toBeDefined();
    });

    it("config.paths.build is defined", () => {
        expect(config.paths.build).toBeDefined();
    });

    it("config.paths.build defaults correctly", () => {
        expect(config.paths.build).toEqual(defaults.paths.build);
    });

    it("config.paths.clients is defined", () => {
        expect(config.paths.clients).toBeDefined();
    });

    it("config.paths.clients defaults correctly", () => {
        expect(config.paths.clients).toEqual(defaults.paths.clients);
    });

    it("config.paths.source is defined", () => {
        expect(config.paths.source).toBeDefined();
    });

    it("config.paths.source defaults correctly", () => {
        expect(config.paths.source).toEqual(defaults.paths.source);
    });

});
