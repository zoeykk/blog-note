const scan = require("./scan");
const precheck = require("./check/precheck");
const check = require("./check");
const { TOKEN_TYPE } = require("./token");
const { ERR_MSG } = require("./err/config");

// const str = 'aa AND "ssss';
// const str = "())"; // 括号需要成对出现，且内容不能为空
// const str = "PUB_D:[2020-01-01 TO *]"; // 日期字段格式错误
// const str = "TACD:(AA((CC)))"; // 字段格式错误
// const str = "(恒瑞 (江苏 AND NANJING)())";
// const str = "XXX AND NOT YY"; // 逻辑词不能相连
const str = "  NOT AA AND"; // 不能以逻辑词结尾
// const str = "ASDFA [*] ASDFASD"; // 无效字符 [: [] *]

function setDisplayStatus(tokens, err) {
  const Hightlights = [
    TOKEN_TYPE.FIELD,
    TOKEN_TYPE.DATEWORD,
    TOKEN_TYPE.LP,
    TOKEN_TYPE.RP,
    TOKEN_TYPE.LSB,
    TOKEN_TYPE.RSB,
    TOKEN_TYPE.LOGIC,
  ];
  for (let i = 0; i < tokens.length; i++) {
    if (Hightlights.includes(tokens[i].type)) {
      tokens[i].hightlight = true;
    }
    if (err[i]) {
      tokens[i].err = ERR_MSG[err[i]];
    }
  }
}

function tranform(str) {
  const err = {};
  // TOKEN
  const _tokens = scan(str, err);
  if (Object.keys(err).length) {
    setDisplayStatus(_tokens, err);
    return _tokens;
  }
  const tokens = _tokens.filter((item) => item.type !== TOKEN_TYPE.SPACE);
  // PRE CHECK
  precheck(tokens, err);
  if (Object.keys(err).length) {
    setDisplayStatus(_tokens, err);
    return _tokens;
  }
  // CHECK
  check(tokens, err);
  if (Object.keys(err).length) {
    setDisplayStatus(_tokens, err);
    return _tokens;
  }
  return _tokens;
}

const tokens = tranform(str);
console.log(tokens);

module.exports = { tranform };
