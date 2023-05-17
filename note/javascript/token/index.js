const { tokenizer } = require("./tokenlize");
const { parse } = require("./parse");

const srcStr = '() TACD:("恒瑞" AND 天天) AND PUB_D : [20200101 TO 20220202]';
// const srcStr = "PUB_D: dd [20200101 TO 20220202]";
const tokens = tokenizer(srcStr);
const parseTokens = parse(tokens);
console.log(parseTokens);
