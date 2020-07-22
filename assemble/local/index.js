
/*

    eslint

    import/unambiguous: "off",
    import/no-commonjs: "off",

    --

    This is just a stub for local development of this package

*/


const fs = require("fs").promises;

const express = require("express");


const app = express();
const port = 3000;

app.get("/", async (request, response) => response.send(await fs.readFile("local/index.html").toString()));

app.listen(port, () => console.log(`Example app listening at http://localhost:${ port }`));
