const scan = require("./scan");
const precheck = require("./check/precheck");
const check = require("./check");

// const str = "PUB_D : [2020-01-01 TO 2022-02-02]";
// const str = 'TACD:(AA((CC) ))';
// const str = "(恒瑞 (江苏 AND NANJING)())";
// const str = "XXX AND NOT YY"; // 不能相连的逻辑词
// const str = "ASDFA : ASDFASD";
const str =
  "AA NOT BB AND PUB_D:[2020-01-01 TO 2022-02-02] TACD:((BB(TTT(6666))))";

function tranform(str) {
  // TOKEN
  const tokens = scan(str);
  if (tokens.some((item) => item.err)) {
    return tokens;
  }
  // PRE CHECK
  precheck(tokens);
  if (tokens.some((item) => item.err)) {
    return tokens;
  }
  // CHECK
  return check(tokens);
}

const tokens = tranform(str);
console.log(tokens);
