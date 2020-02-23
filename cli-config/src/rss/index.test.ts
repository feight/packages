

import "jasmine";

import { defaults } from "../defaults";

import { config } from "..";


describe("{ config.rss }", () => {

    it("config.rss is defined", () => {
        expect(config.rss).toBeDefined();
    });

    it("config.rss.glob is defined", () => {
        expect(config.rss.glob).toBeDefined();
    });

    it("config.rss.glob defaults correctly", () => {
        expect(config.rss.glob).toEqual(defaults.rss.glob);
    });

    it("config.rss.ignore is defined", () => {
        expect(config.rss.ignore).toBeDefined();
    });

    it("config.rss.ignore defaults correctly", () => {
        expect(config.rss.ignore).toEqual(defaults.rss.ignore);
    });

});
