const { KEYWORDS, LOGICS, TOKEN } = require("./token");

// 正则  PUB_D\s*:\s*\[\s*(\d{8})\s+TO\s+(\d{8})\]
// 0
// 1 ：
// 2 [
// 3 YYYMMDDDD
// 4 TO
// 5 YYYMMDDDD
// 6 ]
function parseDateUnit(index, tokens) {
  let currentState = 0;
  for (let i = index + 1; i < tokens.length; i++) {
    const tokenType = tokens[i].type;
    if (tokenType == TOKEN.SPACE) {
      continue;
    } else {
      if (currentState == 0) {
        if (tokenType == TOKEN.COLON) {
          currentState = 1;
        } else {
          currentState = -1;
          break;
        }
      } else if (currentState == 1) {
        if (tokenType == TOKEN.LSB) {
          currentState = 2;
        } else {
          currentState = -1;
          break;
        }
      } else if (currentState == 2) {
        if (tokenType == TOKEN.WORDCHAR) {
          currentState = 3;
        } else {
          currentState = -1;
          break;
        }
      } else if (currentState == 3) {
        if (tokenType == TOKEN.LOGIC) {
          currentState = 4;
        } else {
          currentState = -1;
          break;
        }
      } else if (currentState == 4) {
        if (tokenType == TOKEN.WORDCHAR) {
          currentState = 5;
        } else {
          currentState = -1;
          break;
        }
      } else if (currentState == 5) {
        if (tokenType == TOKEN.RSB) {
          currentState = 6; // success
          break;
        } else {
          currentState = -1;
          break;
        }
      }
    }
  }
  if (currentState < 0) {
    tokens[index].err = true;
    tokens[index].errMsg = "PUBD使用不对";
  }
}

// 括号的有效性，缺少一侧括号或者多了一侧括号
// 不能以逻辑词开头或者结尾，不能出现连续的逻辑词
exports.parse = function (tokens) {
  const pStack = [],
    bStack = [];
  let preLogicIndex = -1;
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    // logic
    if (token.type == TOKEN.LOGIC) {
      if (i == 0) {
        tokens[i].err = true;
        tokens[i].errMsg = "不能以逻辑词开头或者结尾";
      } else {
        if (i - preLogicIndex == 2 && tokens[i - 1].type == TOKEN.SPACE) {
          tokens[preLogicIndex].err = true;
          tokens[preLogicIndex].errMsg = "不能出现连续的逻辑词";
          tokens[i].err = true;
          tokens[i].errMsg = "不能出现连续的逻辑词";
        }
        if (i == tokens.length - 1) {
          tokens[i].err = true;
          tokens[i].errMsg = "不能以逻辑词开头或者结尾";
        }
      }
      preLogicIndex = i;
    }
    // p
    if (token.type == TOKEN.LP) {
      pStack.push(token);
    } else if (token.type == TOKEN.RP) {
      if (pStack.length) {
        if (pStack[pStack.length - 1].type == TOKEN.LP) {
          pStack.pop();
        }
      } else {
        tokens[i].err = true;
        tokens[i].errMsg = "缺少左侧括号";
      }
    }
    // b
    if (token.type == TOKEN.LSB) {
      if (bStack.length) {
        tokens[i].err = true;
        tokens[i].errMsg = "[不能嵌套";
      } else {
        bStack.push(token);
      }
    } else if (token.type == TOKEN.RSB) {
      if (bStack.length) {
        if (bStack[bStack.length - 1].type == TOKEN.LSB) {
          bStack.pop();
        }
      } else {
        tokens[i].err = true;
        tokens[i].errMsg = "缺少左侧[括号";
      }
    }
    // pubd
    if (token.value == "PUB_D") {
      parseDateUnit(i, tokens);
    }
  }
  if (pStack.length) {
    for (let i = 0; i < pStack.length; i++) {
      tokens[pStack[i].index].err = true;
      tokens[pStack[i].index].errMsg = "多了左侧(括号";
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
