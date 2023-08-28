const { TOKEN_TYPE } = require("../token");
const { parsePubd } = require("./parsePubd");

// 括号的有效性，缺少一侧括号或者多了一侧括号
// 不能以逻辑词开头或者结尾，不能出现连续的逻辑词
exports.parse = function (tokens) {
  const pStack = [],
    bStack = [];
  let preLogicIndex = -1;
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    // // logic
    // if (token.type == TOKEN_TYPE.LOGIC) {
    //   if (i == 0) {
    //     tokens[i].err = true;
    //     tokens[i].errMsg = "不能以逻辑词开头或者结尾";
    //   } else {
    //     if (i - preLogicIndex == 2 && tokens[i - 1].type == TOKEN_TYPE.SPACE) {
    //       tokens[preLogicIndex].err = true;
    //       tokens[preLogicIndex].errMsg = "不能出现连续的逻辑词";
    //       tokens[i].err = true;
    //       tokens[i].errMsg = "不能出现连续的逻辑词";
    //     }
    //     if (i == tokens.length - 1) {
    //       tokens[i].err = true;
    //       tokens[i].errMsg = "不能以逻辑词开头或者结尾";
    //     }
    //   }
    //   preLogicIndex = i;
    // }
    // parenthesis
    if (token.type == TOKEN_TYPE.LP) {
      pStack.push(token);
    } else if (token.type == TOKEN_TYPE.RP) {
      if (pStack.length) {
        pStack.pop();
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
        bStack.push(token);
      }
    } else if (token.type == TOKEN_TYPE.RSB) {
      if (bStack.length) {
        bStack.pop();
      } else {
        tokens[i].err = true;
        tokens[i].errMsg = "缺少左侧[括号";
      }
    }
    // pubd
    if (token.value == "PUB_D") {
      parsePubd(i, tokens);
    }
  }
  if (pStack.length) {
    for (let i = 0; i < pStack.length; i++) {
      tokens[pStack[i].index].err = true;
      tokens[pStack[i].index].errMsg = "缺少右侧)括号";
    }
  }
  if (bStack.length) {
    for (let i = 0; i < bStack.length; i++) {
      tokens[bStack[i].index].err = true;
      tokens[bStack[i].index].errMsg = "缺少右侧]括号";
    }
  }
  return tokens;
};
