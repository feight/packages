

import "jasmine";

import { config } from "../../..";
import { defaults } from "../../../defaults";


describe("{ config.local.emulators.firestore }", () => {

    it("config.local.emulators.firestore is defined", () => {
        expect(config.local.emulators.firestore).toBeDefined();
    });

    it("config.local.emulators.firestore.host is defined", () => {
        expect(config.local.emulators.firestore.host).toBeDefined();
    });

    it("config.local.emulators.firestore.host defaults correctly", () => {
        expect(config.local.emulators.firestore.host).toEqual(defaults.local.emulators.firestore.host);
    });

    it("config.local.emulators.firestore.port is defined", () => {
        expect(config.local.emulators.firestore.port).toBeDefined();
    });

    it("config.local.emulators.firestore.port defaults correctly", () => {
        expect(config.local.emulators.firestore.port).toEqual(defaults.local.emulators.firestore.port);
    });

});
