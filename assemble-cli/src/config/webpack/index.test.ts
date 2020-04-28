

import "jasmine";

import { defaults } from "../defaults";
import { config } from "..";


describe("{ config.webpack }", () => {

    it("config.webpack is defined", () => {
        expect(config.webpack).toBeDefined();
    });

    it("config.webpack.profile is defined", () => {
        expect(config.webpack.profile).toBeDefined();
    });

    it("config.webpack.profile defaults correctly", () => {
        expect(config.webpack.profile).toEqual(defaults.webpack.profile);
    });

});
