

import "jasmine";

import { config } from "../..";


describe("{ config.local.redis }", () => {

    it("config.local.redis is defined", () => {
        expect(config.local.redis).toBeDefined();
    });

});
