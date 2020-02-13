

import "jasmine";

import { defaults } from "../defaults";

import { config } from "..";


describe("{ config.firestore }", () => {

    it("config.firestore is defined", () => {
        expect(config.firestore).toBeDefined();
    });

    it("config.firestore.host is defined", () => {
        expect(config.firestore.host).toBeDefined();
    });

    it("config.firestore.host defaults correctly", () => {
        expect(config.firestore.host).toEqual(defaults.firestore.host);
    });

    it("config.firestore.port is defined", () => {
        expect(config.firestore.port).toBeDefined();
    });

    it("config.firestore.port defaults correctly", () => {
        expect(config.firestore.port).toEqual(defaults.firestore.port);
    });

});
