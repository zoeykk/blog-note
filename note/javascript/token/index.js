const scan = require("./scan");
const { precheck } = require("./parse/precheck");
const parse = require("./parse");

// const srcStr = '() TACD:("恒(瑞" AND 天天) AND PUB_D : [2020-01-01 TO 2022-02-02]';
// const srcStr = 'PUB_D:[20200101 TO 20220202]"';
// const srcStr = 'HEADS"123"**:**"  "';
const srcStr = 'TACD:("ASDFA") and xx APP_D : [2020-01-01 TO 2022-02-02]';

function transform(str) {
  const tokens = scan(str);
  let isTokenErr = tokens.some((item) => item.err);
  if (isTokenErr) {
    return tokens;
  }
  precheck(tokens);
  isTokenErr = tokens.some((item) => item.err);
  if (isTokenErr) {
    return tokens;
  }
  parse(tokens);
  return tokens;
}

console.log(transform(srcStr));
