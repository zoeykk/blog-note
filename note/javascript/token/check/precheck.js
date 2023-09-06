const { TOKEN_TYPE } = require("../token");
const { ERR_CODE } = require("../err/config");

/**
 * 预校验
 * 1.只能以 空格 keyword 字段名 小括号开头
 * 2.括号的有效性，缺少一侧括号或者多了一侧括号
 * 3.圆括号内容不能为空
 * @param {*} tokens
 * @returns
 */
function precheck(tokens) {
  const err = {},
    pStack = [],
    pContentTokensStack = [],
    firstTypes = [
      TOKEN_TYPE.FIELD,
      TOKEN_TYPE.FIELD_DATE,
      TOKEN_TYPE.SPACE,
      TOKEN_TYPE.WORD,
      TOKEN_TYPE.STRWORD,
      TOKEN_TYPE.DATEWORD,
      TOKEN_TYPE.LP,
    ];
  if (!firstTypes.includes(tokens[0].type)) {
    err[tokens[0].index] = INVALID_START;
  }
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    // parenthesis
    if (token.type == TOKEN_TYPE.LP) {
      pStack.push(i);
    } else if (token.type == TOKEN_TYPE.RP) {
      if (pStack.length) {
        const pop = pStack.pop();
        pContentTokensStack.push(tokens.slice(pop, i + 1));
      } else {
        err[tokens[i].index] = ERR_CODE.MISSING_LP;
      }
    }
  }
  if (pStack.length) {
    for (let i = 0; i < pStack.length; i++) {
      err[tokens[i].index] = ERR_CODE.MISSING_RP;
    }
  }
  pContentTokensStack.forEach((pContentTokens) => {
    // 只包含() 或者 (空格)
    const emptyTypes = [TOKEN_TYPE.LP, TOKEN_TYPE.RP, TOKEN_TYPE.SPACE];
    const isEmpty = pContentTokens.every((item) =>
      emptyTypes.includes(item.type)
    );
    if (isEmpty) {
      pContentTokens.forEach((item) => {
        err[item.index] = ERR_CODE.EMPTY_CONTENT_IN_P;
      });
    }
  });
  return err;
}

module.exports = precheck;
