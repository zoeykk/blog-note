const { FIELDS, LOGICS, TOKEN, TOKEN_TYPE } = require("./token");

const tokens = [];
let currentToken = { type: "", value: "" };

function isSpace(char) {
  return /\s/.test(char);
}

function isSeparator(char) {
  return [TOKEN.LP, TOKEN.RP, TOKEN.LSB, TOKEN.RSB, TOKEN.COLON].includes(char);
}

function isLogic(char) {
  return LOGICS.includes(char);
}

function isField(char) {
  return FIELDS.includes(char);
}

function isDq(char) {
  return char === TOKEN.DQ;
}

// check keyword
function checkWord(token) {}

// check string keyword
function checkStrWord(token) {
  const tokenValueLen = token.value.length;
  if (tokenValueLen < 2) {
    token.err = true;
    token.errMsg = '缺少符号"';
  } else {
    if (token.value[tokenValueLen - 1] == TOKEN.DQ) {
      const content = token.value.slice(1, tokenValueLen - 1);
      if (!content.trim()) {
        token.err = true;
        token.errMsg = "引号内容为空";
      }
    } else {
      token.err = true;
      token.errMsg = '缺少符号"';
    }
  }
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
  } else if (token.type == TOKEN_TYPE.WORD) {
    token.type = TOKEN_TYPE.KEYWORD;
    checkWord(token);
  } else if (token.type == TOKEN_TYPE.STRWORD) {
    token.type = TOKEN_TYPE.KEYWORD;
    checkStrWord(token);
  }
  tokens.push({ ...token, index });
  index++;
}

// init mode
function start(char) {
  if (isSeparator(char)) {
    currentToken = { type: TOKEN_TYPE.SEPARATOR, value: char };
    return separatorFun;
  } else if (isSpace(char)) {
    currentToken = { type: TOKEN_TYPE.SPACE, value: char };
    return spaceFun;
  } else if (isDq(char)) {
    currentToken = { type: TOKEN_TYPE.STRWORD, value: char };
    return dQFun;
  }
  currentToken = { type: TOKEN_TYPE.WORD, value: char };
  return wordFun;
}

// space mode
function spaceFun(char) {
  if (isSpace(char)) {
    currentToken.value += char;
    return spaceFun;
  } else if (isSeparator(char)) {
    emitToken(currentToken);
    currentToken = { type: TOKEN_TYPE.SEPARATOR, value: char };
    return separatorFun;
  } else if (isDq(char)) {
    emitToken(currentToken);
    currentToken = { type: TOKEN_TYPE.STRWORD, value: char };
    return dQFun;
  }
  emitToken(currentToken);
  currentToken = { type: TOKEN_TYPE.WORD, value: char };
  return wordFun;
}

// separator mode
function separatorFun(char) {
  emitToken(currentToken);
  if (isSeparator(char)) {
    currentToken = { type: TOKEN_TYPE.SEPARATOR, value: char };
    return separatorFun;
  } else if (isSpace(char)) {
    currentToken = { type: TOKEN_TYPE.SPACE, value: char };
    return spaceFun;
  } else if (isDq(char)) {
    currentToken = { type: TOKEN_TYPE.STRWORD, value: char };
    return dQFun;
  }
  currentToken = { type: TOKEN_TYPE.WORD, value: char };
  return wordFun;
}

// word mode
function wordFun(char) {
  if (isSeparator(char)) {
    emitToken(currentToken);
    currentToken = { type: TOKEN_TYPE.SPACE, value: char };
    return separatorFun;
  } else if (isSpace(char)) {
    emitToken(currentToken);
    currentToken = { type: TOKEN_TYPE.SPACE, value: char };
    return spaceFun;
  } else if (isDq(char)) {
    emitToken(currentToken);
    currentToken = { type: TOKEN_TYPE.STRWORD, value: char };
    return dQFun;
  }
  currentToken.value += char;
  return wordFun;
}

// double quotation mode
function dQFun(char) {
  currentToken.value += char;
  if (isDq(char)) {
    emitToken(currentToken);
    return start;
  }
  return dQFun;
}

function tokenizer(input) {
  let state = start;
  input.split("").forEach((char) => {
    state = state(char);
  });
  if (currentToken.value) {
    emitToken(currentToken);
  }
  return tokens;
}

module.exports = { tokenizer };
