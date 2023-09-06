const scan = require("./scan");
const precheck = require("./check/precheck");
const check = require("./check");
const { TOKEN_TYPE } = require("./token");
const { ERR_MSG } = require("./err/config");

const str = "())"; // 括号需要成对出现，且内容不能为空
// const str = "PUB_D:[2020-01-01 TO *]"; // 日期字段格式错误
// const str = "TACD:(AA((CC)))"; // 字段格式错误
// const str = "(恒瑞 (江苏 AND NANJING)())";
// const str = "XXX AND NOT YY"; // 逻辑词不能相连
// const str = "AA AND"; // 不能以逻辑词结尾
// const str = "ASDFA [*] ASDFASD"; // 无效字符 [: [] *]

function setErr(tokens, err) {
  for (let i = 0; i < tokens.length; i++) {
    if (err[i]) {
      tokens[i].errMsg = ERR_MSG[err[i]];
    }
  }
}

function tranform(str) {
  // TOKEN
  const _tokens = scan(str);
  const tokens = _tokens.filter((item) => item.type !== TOKEN_TYPE.SPACE);
  if (tokens.some((item) => item.err)) {
    return tokens;
  }
  // PRE CHECK
  const err = precheck(tokens);
  if (Object.keys(err).length) {
    setErr(_tokens, err);
    return _tokens;
  }
  // CHECK
  check(tokens);
  return _tokens;
}

const tokens = tranform(str);
console.log(tokens);
