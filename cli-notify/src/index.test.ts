

import "jasmine";


import { notify } from ".";


describe("{ notify }", () => {

    it("is defined", () => {

        expect(notify).toBeDefined();

    });

    // eslint-disable-next-line @typescript-eslint/no-floating-promises -- this is ok because it's just a test if the notify fires
    notify("Test of @newsteam/cli-notify completed");

});
