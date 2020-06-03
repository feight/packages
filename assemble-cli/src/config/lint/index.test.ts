

import "jasmine";

import { defaults } from "../defaults";
import { config } from "..";


describe("{ config.local }", () => {

    it("config.local is defined", () => {
        expect(config.local).toBeDefined();
    });

    it("config.local.console is defined", () => {
        expect(config.local.console).toBeDefined();
    });

    it("config.local.console defaults correctly", () => {
        expect(config.local.console).toEqual(defaults.local.console);
    });

});
