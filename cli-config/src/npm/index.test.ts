

import "jasmine";

import { defaults } from "../defaults";

import { config } from "..";


describe("{ config.npm }", () => {

    it("config.npm is defined", () => {
        expect(config.npm).toBeDefined();
    });

    it("config.npm.manifests is defined", () => {
        expect(config.npm.manifests).toBeDefined();
    });

    it("config.npm.manifests defaults correctly", () => {
        expect(config.npm.manifests).toEqual(defaults.npm.manifests);
    });

});
