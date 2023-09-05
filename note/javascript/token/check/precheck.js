const { TOKEN_TYPE } = require("../token");

/**
 * 预校验
 * 1.只能以 空格 keyword 字段名 小括号开头
 * 2.括号的有效性，缺少一侧括号或者多了一侧括号
 * 3.圆括号内容不能为空
 * @param {*} tokens
 * @returns
 */
function precheck(tokens) {
  const pStack = [],
    pContentTokensStack = [],
    bStack = [],
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
    tokens[0].err = true;
    tokens[0].errMsg = "该类型不能出现在开头";
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
        tokens[i].err = true;
        tokens[i].errMsg = "缺少左侧括号";
      }
    }
    // square brackets
    if (token.type == TOKEN_TYPE.LSB) {
      if (bStack.length) {
        tokens[i].err = true;
        tokens[i].errMsg = "[不能嵌套";
      } else {
        bStack.push(i);
      }
    } else if (token.type == TOKEN_TYPE.RSB) {
      if (bStack.length) {
        bStack.pop();
      } else {
        tokens[i].err = true;
        tokens[i].errMsg = "缺少左侧[括号";
      }
    }
  }
  if (pStack.length) {
    for (let i = 0; i < pStack.length; i++) {
      tokens[pStack[i]].err = true;
      tokens[pStack[i]].errMsg = "缺少右侧)括号";
    }
  }
  if (bStack.length) {
    for (let i = 0; i < bStack.length; i++) {
      tokens[bStack[i]].err = true;
      tokens[bStack[i]].errMsg = "缺少右侧]括号";
    }
  }
  const pContent = pContentTokensStack.forEach((pContentTokens) => {
    // 只包含() 或者 (空格)
    const emptyTypes = [TOKEN_TYPE.LP, TOKEN_TYPE.RP, TOKEN_TYPE.SPACE];
    const isEmpty = pContentTokens.every((item) =>
      emptyTypes.includes(item.type)
    );
    if (isEmpty) {
      pContentTokens.forEach((item) => {
        if ([TOKEN_TYPE.LP, TOKEN_TYPE.RP].includes(item.type)) {
          tokens[item.index].err = true;
          tokens[item.index].errMsg = "()内容不能为空";
        }
      });
    }
  });
  return tokens;
}

module.exports = precheck;
