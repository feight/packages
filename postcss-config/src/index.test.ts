

import "jasmine";


import config from ".";


describe("config", () => {

    it("config.plugins === true", () => {

        expect(config.plugins).toBeDefined();

    });

});
