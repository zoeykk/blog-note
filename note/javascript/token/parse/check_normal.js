const { TOKEN_TYPE } = require("../token");

function check(tokens, index) {
  let state = 0;
  const transfer = [
    [0, 0, 0, 0, 1, 2, 2, -1, -1, 2, -1, -1, -1, -1, -1], // 0  初始状态
    [1, 0, 0, 0, -1, 2, 2, -1, -1, 2, -1, -1, -1, -1, -1], // 1  逻辑符号连接状态
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
  const NEXT = [
    TOKEN_TYPE.FIELD,
    TOKEN_TYPE.FIELD_DATE,
    TOKEN_TYPE.LP,
    TOKEN_TYPE.RP,
  ];
  for (let i = index; i < tokens.length; i++) {
    const token = tokens[i];
    if (NEXT.includes(token.type)) {
      endIndex = i - 1;
      break;
    }
    state = transfer[state][getColNum(token)];
    console.log(state, token);
    if (state < 0) {
      token.err = true;
      token.errMsg = "语法错误";
      endIndex = i;
      break;
    }
    if (state === 1) {
      token.err = true;
      token.errMsg = "不能以逻辑词结尾";
      endIndex = i;
      break;
    }
  }
  return endIndex;
}
module.exports = check;
