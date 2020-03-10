

import path from "path";

import "jasmine";


import {
    getDependenciesHash,
    getSourceCodeHash
} from ".";


describe("{ getDependenciesHash }", () => {

    it("is defined", () => {

        expect(getDependenciesHash).toBeDefined();

    });

    it("gets equal hashes for equal dependences", async () => {

        const hashA = await getDependenciesHash(path.join(process.cwd(), "src/hash/test-assets/dependencies/equal/code-a/test"));
        const hashB = await getDependenciesHash(path.join(process.cwd(), "src/hash/test-assets/dependencies/equal/code-b/test"));

        expect(hashA).toEqual(hashB);

    });

    it("gets unequal hashes for unequal dependences", async () => {

        const hashA = await getDependenciesHash(path.join(process.cwd(), "src/hash/test-assets/dependencies/unequal/code-a/test"));
        const hashB = await getDependenciesHash(path.join(process.cwd(), "src/hash/test-assets/dependencies/unequal/code-b/test"));

        expect(hashA === hashB).toBeFalse();

    });

});


describe("{ getSourceCodeHash }", () => {

    it("is defined", () => {

        expect(getSourceCodeHash).toBeDefined();

    });

    it("gets equal hashes for equal source code", async () => {

        const hashA = await getSourceCodeHash(path.join(process.cwd(), "src/hash/test-assets/source-code/equal/code-a/test"));
        const hashB = await getSourceCodeHash(path.join(process.cwd(), "src/hash/test-assets/source-code/equal/code-b/test"));

        expect(hashA).toEqual(hashB);

    });

    it("gets unequal hashes for unequal source code", async () => {

        const hashA = await getSourceCodeHash(path.join(process.cwd(), "src/hash/test-assets/source-code/unequal/code-a/test"));
        const hashB = await getSourceCodeHash(path.join(process.cwd(), "src/hash/test-assets/source-code/unequal/code-b/test"));

        expect(hashA === hashB).toBeFalse();

    });

});
