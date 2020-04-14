

import "jasmine";

import { config } from "../../..";
import { defaults } from "../../../defaults";


describe("{ config.local.docker.elasticsearch }", () => {

    it("config.local.docker.elasticsearch is defined", () => {
        expect(config.local.docker.elasticsearch).toBeDefined();
    });

    it("config.local.docker.elasticsearch.environment is defined", () => {
        expect(config.local.docker.elasticsearch.environment).toBeDefined();
    });

    it("config.local.docker.elasticsearch.environment defaults correctly", () => {
        expect(config.local.docker.elasticsearch.environment).toEqual(defaults.local.docker.elasticsearch.environment);
    });

    it("config.local.docker.elasticsearch.name is defined", () => {
        expect(config.local.docker.elasticsearch.name).toBeDefined();
    });

    it("config.local.docker.elasticsearch.name defaults correctly", () => {
        expect(config.local.docker.elasticsearch.name).toEqual("elasticsearch");
    });

    it("config.local.docker.elasticsearch.port is defined", () => {
        expect(config.local.docker.elasticsearch.port).toBeDefined();
    });

    it("config.local.docker.elasticsearch.port defaults correctly", () => {
        expect(config.local.docker.elasticsearch.port).toEqual(defaults.local.docker.elasticsearch.port);
    });

    it("config.local.docker.elasticsearch.recipe is defined", () => {
        expect(config.local.docker.elasticsearch.recipe).toBeDefined();
    });

    it("config.local.docker.elasticsearch.recipe defaults correctly", () => {
        expect(config.local.docker.elasticsearch.recipe).toEqual(defaults.local.docker.elasticsearch.recipe);
    });

});
