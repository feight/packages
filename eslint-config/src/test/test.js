

export const testFuction = async function(){

    const test = await import(/* webpackChunkName: "test.js" */ "./test-import");

    console.log(test);

    return test;

};


export const xyz = 1;
