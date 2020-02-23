

import "jasmine";

import { defaults } from "../defaults";

import { config } from "..";


describe("{ config.htmlmin }", () => {

    it("config.htmlmin is defined", () => {
        expect(config.htmlmin).toBeDefined();
    });

    it("config.htmlmin.glob is defined", () => {
        expect(config.htmlmin.glob).toBeDefined();
    });

    it("config.htmlmin.glob defaults correctly", () => {
        expect(config.htmlmin.glob).toEqual(defaults.htmlmin.glob);
    });

    it("config.htmlmin.ignore is defined", () => {
        expect(config.htmlmin.ignore).toBeDefined();
    });

    it("config.htmlmin.ignore defaults correctly", () => {
        expect(config.htmlmin.ignore).toEqual(defaults.htmlmin.ignore);
    });

    it("config.htmlmin.options is defined", () => {
        expect(config.htmlmin.options).toBeDefined();
    });

    it("config.htmlmin.options defaults correctly", () => {
        expect(config.htmlmin.options).toEqual(defaults.htmlmin.options);
    });

});
