const { TOKEN_TYPE } = require("../token");

// 正则  PUB_D\s*:\s*\[\s*(\d{8})\s+TO\s+(\d{8})\]
// 0
// 1 ：
// 2 [
// 3 YYYMMDDDD
// 4 TO
// 5 YYYMMDDDD
// 6 ]
exports.parsePubd = function (index, tokens) {
  let currentState = 0;
  for (let i = index + 1; i < tokens.length; i++) {
    const tokenType = tokens[i].type;
    if (tokenType == TOKEN_TYPE.SPACE) {
      continue;
    } else {
      if (currentState == 0) {
        if (tokenType == TOKEN_TYPE.COLON) {
          currentState = 1;
        } else {
          currentState = -1;
          break;
        }
      } else if (currentState == 1) {
        if (tokenType == TOKEN_TYPE.LSB) {
          currentState = 2;
        } else {
          currentState = -1;
          break;
        }
      } else if (currentState == 2) {
        if (tokenType == TOKEN_TYPE.WORD) {
          currentState = 3;
        } else {
          currentState = -1;
          break;
        }
      } else if (currentState == 3) {
        if (tokenType == TOKEN_TYPE.LOGIC) {
          currentState = 4;
        } else {
          currentState = -1;
          break;
        }
      } else if (currentState == 4) {
        if (tokenType == TOKEN_TYPE.WORD) {
          currentState = 5;
        } else {
          currentState = -1;
          break;
        }
      } else if (currentState == 5) {
        if (tokenType == TOKEN_TYPE.RSB) {
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
};

