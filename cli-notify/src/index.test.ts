

import "jasmine";


import {
    notify
} from ".";


describe("{ notify }", () => {

    it("is defined", () => {

        expect(notify).toBeDefined();

    });

    notify("Testing");

});
