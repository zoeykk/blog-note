const { KEYWORDS, LOGICS, TOKEN } = require("./token");
const REG = {
  OPT: /[:()\[\]]/,
  SPACE: /\s/,
};

const tokens = [];
let currentToken = { type: "", value: "" };

let index = 0;
function emitToken(token) {
  currentToken = { type: "", value: "" };
  if (LOGICS.includes(token.value)) {
    token.type = TOKEN.LOGIC;
  } else if (KEYWORDS.includes(token.value)) {
    token.type = TOKEN.KEYWORD;
  } else if (token.value == "(") {
    token.type = TOKEN.LP;
  } else if (token.value == ")") {
    token.type = TOKEN.RP;
  } else if (token.value == "[") {
    token.type = TOKEN.LSB;
  } else if (token.value == "]") {
    token.type = TOKEN.RSB;
  } else if (token.value == ":") {
    token.type = TOKEN.COLON;
  } else if (token.value[0] == '"') {
    const tokenValueLen = token.value.length;
    if (token.value[tokenValueLen - 1] == '"') {
      if (tokenValueLen == 2) {
        token.err = true;
        token.errMsg = "缺少值";
      } else {
        token.type = TOKEN.DWORDCHAR;
      }
    } else {
      token.err = true;
      token.errMsg = "缺少符号“";
    }
  }
  tokens.push({ ...token, index });
  index++;
}

function start(char) {
  if (REG.OPT.test(char)) {
    currentToken = { type: TOKEN.OPT, value: char };
    return operator;
  } else if (REG.SPACE.test(char)) {
    currentToken = { type: TOKEN.SPACE, value: char };
    return space;
  }
  currentToken = { type: TOKEN.WORDCHAR, value: char };
  return wordchar;
}

function space(char) {
  if (REG.SPACE.test(char)) {
    currentToken.value += char;
    return space;
  } else if (REG.OPT.test(char)) {
    emitToken(currentToken);
    currentToken = { type: TOKEN.OPT, value: char };
    return operator;
  }
  emitToken(currentToken);
  currentToken = { type: TOKEN.WORDCHAR, value: char };
  return wordchar;
}

function operator(char) {
  emitToken(currentToken);
  if (REG.OPT.test(char)) {
    currentToken = { type: TOKEN.OPT, value: char };
    return operator;
  } else if (REG.SPACE.test(char)) {
    currentToken = { type: TOKEN.SPACE, value: char };
    return space;
  }
  currentToken = { type: TOKEN.WORDCHAR, value: char };
  return wordchar;
}

function wordchar(char) {
  if (REG.OPT.test(char)) {
    emitToken(currentToken);
    currentToken = { type: TOKEN.SPACE, value: char };
    return operator;
  } else if (REG.SPACE.test(char)) {
    emitToken(currentToken);
    currentToken = { type: TOKEN.SPACE, value: char };
    return space;
  }
  currentToken.value += char;
  return wordchar;
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
