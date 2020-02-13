

import "jasmine";

import { defaults } from "../defaults";

import { config } from "..";


describe("{ config.server }", () => {

    it("config.server is defined", () => {
        expect(config.server).toBeDefined();
    });

    it("config.server.port is defined", () => {
        expect(config.server.port).toBeDefined();
    });

    it("config.server.port defaults correctly", () => {
        expect(config.server.port).toEqual(defaults.server.port);
    });

});
