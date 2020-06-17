

export const func = async function(){

    // eslint-disable-next-line no-inline-comments -- Needed for the webpack dynamic import to work correctly
    const test = await import(/* webpackChunkName: "test.js" */ "./test-import");

    console.log(test);

    return test;

};


export const xyz = 1;
