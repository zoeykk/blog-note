const scan = require("./scan");
const { precheck } = require("./parse/precheck");
const parse = require("./parse");
const checkField = require("./parse/check_filed");
const checkDateField = require("./parse/check_filed_date");
const checkParenthesis = require("./parse/check_parenthesis");
const checkNormal = require("./parse/check_normal");
const check = require("./parse");
const { TOKEN_TYPE } = require("./token");

// const srcStr = "PUB_D : [2020-01-01 TO 2022-02-02]";
// const srcStr = 'TACD:("恒(瑞" AND 天天)';
// const srcStr = "(恒瑞 (江苏 AND NANJING)())";
const srcStr = "TACD:";

function transform(str) {
  const tokens = scan(str);
  // let isTokenErr = tokens.some((item) => item.err);
  // if (isTokenErr) {
  //   return tokens;d
  // }
  // precheck(tokens);
  // isTokenErr = tokens.some((item) => item.err);
  // if (isTokenErr) {
  //   return tokens;
  // }
  let startIndex = 0;
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (i > 0 && i <= startIndex) {
      continue;
    } else if (token.type === TOKEN_TYPE.LP) {
      startIndex = checkParenthesis(tokens, i);
    } else if (token.type === TOKEN_TYPE.FIELD) {
      startIndex = checkField(tokens, i);
    } else if (token.type === TOKEN_TYPE.FIELD_DATE) {
      startIndex = checkDateField(tokens, i);
    } else if (
      [
        TOKEN_TYPE.WORD,
        TOKEN_TYPE.STRWORD,
        TOKEN_TYPE.DATEWORD,
        TOKEN_TYPE.SPACE,
      ].includes(token.type)
    ) {
      startIndex = checkNormal(tokens, i);
    }
  }
  return tokens;
}

console.log(transform(srcStr));
