

import "jasmine";

import { config } from "../..";


describe("{ config.local.docker }", () => {

    it("config.local.docker is defined", () => {
        expect(config.local.docker).toBeDefined();
    });

});
