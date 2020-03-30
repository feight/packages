

import "jasmine";

import { config } from "../../..";
import { defaults } from "../../../defaults";


describe("{ config.local.python.server }", () => {

    it("config.local.python.server is defined", () => {
        expect(config.local.python.server).toBeDefined();
    });

    it("config.local.python.server.port is defined", () => {
        expect(config.local.python.server.port).toBeDefined();
    });

    it("config.local.python.server.port defaults correctly", () => {
        expect(config.local.python.server.port).toEqual(defaults.local.python.server.port);
    });

});
