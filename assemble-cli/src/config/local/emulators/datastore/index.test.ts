

import "jasmine";

import { config } from "../../..";
import { defaults } from "../../../defaults";


describe("{ config.local.emulators.datastore }", () => {

    it("config.local.emulators.datastore is defined", () => {
        expect(config.local.emulators.datastore).toBeDefined();
    });

    it("config.local.emulators.datastore.host is defined", () => {
        expect(config.local.emulators.datastore.host).toBeDefined();
    });

    it("config.local.emulators.datastore.host defaults correctly", () => {
        expect(config.local.emulators.datastore.host).toEqual(defaults.local.emulators.datastore.host);
    });

    it("config.local.emulators.datastore.persist is defined", () => {
        expect(config.local.emulators.datastore.persist).toBeDefined();
    });

    it("config.local.emulators.datastore.persist defaults correctly", () => {
        expect(config.local.emulators.datastore.persist).toEqual(defaults.local.emulators.datastore.persist);
    });

    it("config.local.emulators.datastore.port is defined", () => {
        expect(config.local.emulators.datastore.port).toBeDefined();
    });

    it("config.local.emulators.datastore.port defaults correctly", () => {
        expect(config.local.emulators.datastore.port).toEqual(defaults.local.emulators.datastore.port);
    });

});
