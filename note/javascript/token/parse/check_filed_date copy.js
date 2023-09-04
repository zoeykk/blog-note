const { TOKEN_TYPE } = require("../token");

function check(tokens, index) {
  let state = 0;
  const transfer = [
    [-1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1],  // 0 初始转态
    [1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1],   // 1 field
    [2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1],   // 2 field:
    [3, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1],    // 3 field:[
    [4, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1],   // 4 field:[*
    [5, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1],    // 5 field:[* To
    [6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, -1],   // 6 field:[* To *]
  ];
  const getColNum = (token) => {
    const { type } = token;
    switch (type) {
      case TOKEN_TYPE.SPACE:
        return 0;
      case TOKEN_TYPE.WORD:
        return 1;
      case TOKEN_TYPE.STRWORD:
        return 2;
      case TOKEN_TYPE.DATEWORD:
        return 3;
      case TOKEN_TYPE.LOGIC:
        return 4;
      case TOKEN_TYPE.FIELD:
        return 5;
      case TOKEN_TYPE.FIELD_DATE:
        return 6;
      case TOKEN_TYPE.COLON:
        return 7;
      case TOKEN_TYPE.TO:
        return 8;
      case TOKEN_TYPE.LP:
        return 9;
      case TOKEN_TYPE.RP:
        return 10;
      case TOKEN_TYPE.LSB:
        return 11;
      case TOKEN_TYPE.RSB:
        return 12;
      case TOKEN_TYPE.WILDCARD:
        return 13;

      default:
        return -1;
    }
  };

  let endIndex = 0;
  for (let i = index; i < tokens.length; i++) {
    const token = tokens[i];
    if (state < 0) {
      if (token.type === TOKEN_TYPE.RSB) {
        endIndex = i;
        break;
      }
      continue;
    }
    state = transfer[state][getColNum(token)];
    if (state < 0) {
      token.err = true;
      token.errMsg = "语法错误";
      continue;
    }
    if (token.type === TOKEN_TYPE.RSB) {
      endIndex = i;
      break;
    }
  }
  return endIndex;
}
module.exports = check;
