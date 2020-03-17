

import path from "path";

import "jasmine";


import {
    getPackageJson
} from ".";


describe("{ getPackageJson }", () => {

    it("is defined", () => {

        expect(getPackageJson).toBeDefined();

    });

    it("getPackageJson reads file references correctly", async () => {

        const packageJson = await getPackageJson(path.join(__dirname, "../package.json"));

        expect(packageJson.name).toEqual("@newsteam/package-json");

    });

    it("getPackageJson reads folder references correctly", async () => {

        const packageJson = await getPackageJson(path.join(__dirname, ".."));

        expect(packageJson.name).toEqual("@newsteam/package-json");

    });

    it("getPackageJson reads blank references correctly", async () => {

        const packageJson = await getPackageJson(path.join(__dirname, ".."));

        expect(packageJson.name).toEqual("@newsteam/package-json");

    });

});
