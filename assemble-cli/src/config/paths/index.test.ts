

import "jasmine";

import { defaults } from "../defaults";
import { config } from "..";


// eslint-disable-next-line max-lines-per-function -- This is ok because it's just a list of tests
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

    it("config.paths.entries is defined", () => {
        expect(config.paths.entries).toBeDefined();
    });

    it("config.paths.entries defaults correctly", () => {
        expect(config.paths.entries).toEqual(defaults.paths.entries);
    });

    it("config.paths.html is defined", () => {
        expect(config.paths.html).toBeDefined();
    });

    it("config.paths.html defaults correctly", () => {
        expect(config.paths.html).toEqual(defaults.paths.html);
    });

    it("config.paths.modernizr is defined", () => {
        expect(config.paths.modernizr).toBeDefined();
    });

    it("config.paths.modernizr defaults correctly", () => {
        expect(config.paths.modernizr).toEqual(defaults.paths.modernizr);
    });

    it("config.paths.npm is defined", () => {
        expect(config.paths.npm).toBeDefined();
    });

    it("config.paths.npm.manifests is defined", () => {
        expect(config.paths.npm.manifests).toBeDefined();
    });

    it("config.paths.npm.manifests defaults correctly", () => {
        expect(config.paths.npm.manifests).toEqual(defaults.paths.npm.manifests);
    });

    it("config.paths.rss.glob is defined", () => {
        expect(config.paths.rss.glob).toBeDefined();
    });

    it("config.paths.rss.glob defaults correctly", () => {
        expect(config.paths.rss.glob).toEqual(defaults.paths.rss.glob);
    });

    it("config.paths.rss.ignore is defined", () => {
        expect(config.paths.rss.ignore).toBeDefined();
    });

    it("config.paths.rss.ignore defaults correctly", () => {
        expect(config.paths.rss.ignore).toEqual(defaults.paths.rss.ignore);
    });

    it("config.paths.scripts is defined", () => {
        expect(config.paths.scripts).toBeDefined();
    });

    it("config.paths.scripts defaults correctly", () => {
        expect(config.paths.scripts).toEqual(defaults.paths.scripts);
    });

    it("config.paths.source is defined", () => {
        expect(config.paths.source).toBeDefined();
    });

    it("config.paths.source defaults correctly", () => {
        expect(config.paths.source).toEqual(defaults.paths.source);
    });

    it("config.paths.static is defined", () => {
        expect(config.paths.static).toBeDefined();
    });

    it("config.paths.static defaults correctly", () => {
        expect(config.paths.static).toEqual(defaults.paths.static);
    });

    it("config.paths.styles is defined", () => {
        expect(config.paths.styles).toBeDefined();
    });

    it("config.paths.styles defaults correctly", () => {
        expect(config.paths.styles).toEqual(defaults.paths.styles);
    });

});
