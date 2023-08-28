const { FIELDS, LOGICS, TOKEN, TOKEN_TYPE } = require("./token");

const tokens = [];
let currentToken = { type: "", value: "" };

function isSpace(char) {
  return /\s/.test(char);
}

function isOperator(char) {
  return [TOKEN.LP, TOKEN.RP, TOKEN.LSB, TOKEN.RSB, TOKEN.COLON].includes(char);
}

function isLogic(char) {
  return LOGICS.includes(char);
}

function isField(char) {
  return FIELDS.includes(char);
}

function isDoubleQuotation(char) {
  return char === TOKEN.DQ;
}

let index = 0;
function emitToken(token) {
  currentToken = { type: "", value: "" };
  if (isLogic(token.value)) {
    token.type = TOKEN_TYPE.LOGIC;
  } else if (isField(token.value)) {
    token.type = TOKEN_TYPE.FIELD;
  } else if (token.value == TOKEN.LP) {
    token.type = TOKEN_TYPE.LP;
  } else if (token.value == TOKEN.RP) {
    token.type = TOKEN_TYPE.RP;
  } else if (token.value == TOKEN.LSB) {
    token.type = TOKEN_TYPE.LSB;
  } else if (token.value == TOKEN.RSB) {
    token.type = TOKEN_TYPE.RSB;
  } else if (token.value == TOKEN.COLON) {
    token.type = TOKEN_TYPE.COLON;
  } else if (token.value[0] == TOKEN.DQ) {
    const tokenValueLen = token.value.length;
    if (token.value[tokenValueLen - 1] == TOKEN.DQ) {
      if (tokenValueLen == 2) {
        token.err = true;
        token.errMsg = "缺少值";
      } else {
        token.type = TOKEN_TYPE.STRWORD;
      }
    } else {
      token.err = true;
      token.errMsg = '缺少符号"';
    }
  }
  tokens.push({ ...token, index });
  index++;
}

function start(char) {
  if (isOperator(char)) {
    currentToken = { type: TOKEN_TYPE.OPT, value: char };
    return operator;
  } else if (isSpace(char)) {
    currentToken = { type: TOKEN_TYPE.SPACE, value: char };
    return space;
  } else if (isDoubleQuotation(char)) {
    currentToken = { type: TOKEN_TYPE.STRWORD, value: char };
    return strwordFun;
  }
  currentToken = { type: TOKEN_TYPE.WORD, value: char };
  return wordchar;
}

function space(char) {
  if (isSpace(char)) {
    currentToken.value += char;
    return space;
  } else if (isOperator(char)) {
    emitToken(currentToken);
    currentToken = { type: TOKEN_TYPE.OPT, value: char };
    return operator;
  } else if (isDoubleQuotation(char)) {
    emitToken(currentToken);
    currentToken = { type: TOKEN_TYPE.STRWORD, value: char };
    return strwordFun;
  }
  emitToken(currentToken);
  currentToken = { type: TOKEN_TYPE.WORD, value: char };
  return wordchar;
}

function operator(char) {
  emitToken(currentToken);
  if (isOperator(char)) {
    currentToken = { type: TOKEN_TYPE.OPT, value: char };
    return operator;
  } else if (isSpace(char)) {
    currentToken = { type: TOKEN_TYPE.SPACE, value: char };
    return space;
  } else if (isDoubleQuotation(char)) {
    emitToken(currentToken);
    currentToken = { type: TOKEN_TYPE.STRWORD, value: char };
    return strwordFun;
  }
  currentToken = { type: TOKEN_TYPE.WORD, value: char };
  return wordchar;
}

function wordchar(char) {
  if (isOperator(char)) {
    emitToken(currentToken);
    currentToken = { type: TOKEN_TYPE.SPACE, value: char };
    return operator;
  } else if (isSpace(char)) {
    emitToken(currentToken);
    currentToken = { type: TOKEN_TYPE.SPACE, value: char };
    return space;
  }
  currentToken.value += char;
  return wordchar;
}

function strwordFun(char) {
  currentToken.value += char;
  if (isDoubleQuotation(char)) {
    emitToken(currentToken);
    return start;
  }
  return strwordFun;
}

exports.tokenizer = function (input) {
  let state = start;
  input.split("").forEach((char) => {
    state = state(char);
  });
  // 遍历结束后仍然需要发送一次最后
  emitToken(currentToken);
  return tokens;
};
