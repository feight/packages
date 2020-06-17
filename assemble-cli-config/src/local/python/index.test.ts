

import "jasmine";

import { config } from "../..";


describe("{ config.local.python }", () => {

    it("config.local.python is defined", () => {
        expect(config.local.python).toBeDefined();
    });

});
