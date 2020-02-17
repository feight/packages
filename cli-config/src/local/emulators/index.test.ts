

import "jasmine";

import { config } from "../..";


describe("{ config.local.emulators }", () => {

    it("config.local.emulators is defined", () => {
        expect(config.local.emulators).toBeDefined();
    });

});
