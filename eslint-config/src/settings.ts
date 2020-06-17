

const indentSpaces = 4;
const maximumCyclomaticComplexity = 20;
const maximumFileLineCount = 1000;
const maximumLineLength = 160;
const noMagicNumbersConfig = {
    detectObjects: false,
    ignore: [
        -1,
        0,
        1,
        2
    ],
    ignoreArrayIndexes: true
};


export {
    indentSpaces,
    maximumCyclomaticComplexity,
    maximumFileLineCount,
    maximumLineLength,
    noMagicNumbersConfig
};
