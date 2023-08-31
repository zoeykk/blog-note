const scan = require("./scan");
const { precheck } = require("./parse/precheck");

// const srcStr = '() TACD:("恒(瑞" AND 天天) AND PUB_D : [20200101 TxO 20220202]';
const srcStr = 'PUB_D:[20200101 TO 20220202]"';
// const srcStr = 'HEADS"123"**:**"  "';

function transform(str) {
  const tokens = scan(str);
  const isTokenErr = tokens.some((item) => item.err);
  if (isTokenErr) {
    return tokens;
  }
  precheck(tokens);
  return tokens;
}

console.log(transform(srcStr));
