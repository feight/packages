

import "jasmine";

import { config } from "../../..";
import { defaults } from "../../../defaults";


describe("{ config.local.docker.mysql }", () => {

    it("config.local.docker.mysql is defined", () => {
        expect(config.local.docker.mysql).toBeDefined();
    });

    it("config.local.docker.mysql.environment is defined", () => {
        expect(config.local.docker.mysql.environment).toBeDefined();
    });

    it("config.local.docker.mysql.environment defaults correctly", () => {
        expect(config.local.docker.mysql.environment).toEqual(defaults.local.docker.mysql.environment);
    });

    it("config.local.docker.mysql.name is defined", () => {
        expect(config.local.docker.mysql.name).toBeDefined();
    });

    it("config.local.docker.mysql.name defaults correctly", () => {
        expect(config.local.docker.mysql.name).toEqual("mysql");
    });

    it("config.local.docker.mysql.port is defined", () => {
        expect(config.local.docker.mysql.port).toBeDefined();
    });

    it("config.local.docker.mysql.port defaults correctly", () => {
        expect(config.local.docker.mysql.port).toEqual(defaults.local.docker.mysql.port);
    });

    it("config.local.docker.mysql.recipe is defined", () => {
        expect(config.local.docker.mysql.recipe).toBeDefined();
    });

    it("config.local.docker.mysql.recipe defaults correctly", () => {
        expect(config.local.docker.mysql.recipe).toEqual(defaults.local.docker.mysql.recipe);
    });

});
