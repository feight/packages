

import "jasmine";

import { config } from "../../..";
import { defaults } from "../../../defaults";


describe("{ config.local.redis.server }", () => {

    it("config.local.redis.server is defined", () => {
        expect(config.local.redis.server).toBeDefined();
    });

    it("config.local.redis.server.port is defined", () => {
        expect(config.local.redis.server.port).toBeDefined();
    });

    it("config.local.redis.server.port defaults correctly", () => {
        expect(config.local.redis.server.port).toEqual(defaults.local.redis.server.port);
    });

});
