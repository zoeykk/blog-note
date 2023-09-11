const { FIELDS, DATE_FIELDS, LOGICS, TOKEN, TOKEN_TYPE } = require("../token");
const { ERR_CODE, ERR_MSG } = require("../err/config");

function scan(input) {
  function isSpace(char) {
    return /\s/.test(char);
  }

  function isSeparator(char) {
    return [TOKEN.LP, TOKEN.RP, TOKEN.LSB, TOKEN.RSB, TOKEN.COLON].includes(
      char
    );
  }

  function isLogic(str) {
    return LOGICS.includes(str);
  }

  function isTo(str) {
    return ["TO", "to", "To"].includes(str);
  }

  function isField(str) {
    return FIELDS.includes(str);
  }

  function isDateField(str) {
    return DATE_FIELDS.includes(str);
  }

  function isDq(char) {
    return char === TOKEN.DQ;
  }

  function isDateWord(str) {
    return str.length === 10 && /\d{4}-\d{2}-\d{2}/.test(str);
  }

  // check keyword
  function checkWord(token) {}

  // check string keyword
  function checkStrWord(token) {
    const err = {};
    const tokenValueLen = token.value.length;
    if (tokenValueLen < 2) {
      err[token.index] = ERR_CODE.MISSING_DQ;
      token.err = true;
      token.errMsg = ERR_MSG.MISSING_DQ;
    } else {
      if (token.value[tokenValueLen - 1] == TOKEN.DQ) {
        const content = token.value.slice(1, tokenValueLen - 1);
        if (!content.trim()) {
          token.err = true;
          token.errMsg = ERR_MSG.EMPTY_CONTENT_IN_DQ;
        }
      } else {
        token.err = true;
        token.errMsg = ERR_MSG.MISSING_DQ;
      }
    }
  }

  // init
  function start(char) {
    if (isSeparator(char)) {
      currentToken = { value: char };
      return readSeparator;
    } else if (isSpace(char)) {
      currentToken = { type: TOKEN_TYPE.SPACE, value: char };
      return readSpace;
    } else if (isDq(char)) {
      currentToken = { type: TOKEN_TYPE.STRWORD, value: char };
      return readStrWord;
    }
    currentToken = { type: TOKEN_TYPE.WORD, value: char };
    return readWord;
  }

  // space
  function readSpace(char) {
    if (isSpace(char)) {
      currentToken.value += char;
      return readSpace;
    } else if (isSeparator(char)) {
      emitToken(currentToken);
      currentToken = { value: char };
      return readSeparator;
    } else if (isDq(char)) {
      emitToken(currentToken);
      currentToken = { type: TOKEN_TYPE.STRWORD, value: char };
      return readStrWord;
    }
    emitToken(currentToken);
    currentToken = { type: TOKEN_TYPE.WORD, value: char };
    return readWord;
  }

  // separator
  function readSeparator(char) {
    emitToken(currentToken);
    if (isSeparator(char)) {
      currentToken = { value: char };
      return readSeparator;
    } else if (isSpace(char)) {
      currentToken = { type: TOKEN_TYPE.SPACE, value: char };
      return readSpace;
    } else if (isDq(char)) {
      currentToken = { type: TOKEN_TYPE.STRWORD, value: char };
      return readStrWord;
    }
    currentToken = { type: TOKEN_TYPE.WORD, value: char };
    return readWord;
  }

  // word
  function readWord(char) {
    if (isSeparator(char)) {
      emitToken(currentToken);
      currentToken = { type: TOKEN_TYPE.SPACE, value: char };
      return readSeparator;
    } else if (isSpace(char)) {
      emitToken(currentToken);
      currentToken = { type: TOKEN_TYPE.SPACE, value: char };
      return readSpace;
    } else if (isDq(char)) {
      emitToken(currentToken);
      currentToken = { type: TOKEN_TYPE.STRWORD, value: char };
      return readStrWord;
    }
    currentToken.value += char;
    return readWord;
  }

  // string word
  function readStrWord(char) {
    currentToken.value += char;
    if (isDq(char)) {
      emitToken(currentToken);
      return start;
    }
    return readStrWord;
  }

  const tokens = [];
  let currentToken = { type: "", value: "" };
  let index = 0;
  function emitToken(token) {
    currentToken = { type: "", value: "" };
    if (isLogic(token.value)) {
      token.type = TOKEN_TYPE.LOGIC;
    } else if (isField(token.value)) {
      token.type = TOKEN_TYPE.FIELD;
    } else if (isDateField(token.value)) {
      token.type = TOKEN_TYPE.FIELD_DATE;
    } else if (isTo(token.value)) {
      token.type = TOKEN_TYPE.TO;
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
      if (token.value === "*") {
        token.type = TOKEN_TYPE.WILDCARD;
      } else if (isDateWord(token.value)) {
        token.type = TOKEN_TYPE.DATEWORD;
      }
      checkWord(token);
    } else if (token.type == TOKEN_TYPE.STRWORD) {
      checkStrWord(token);
    }
    tokens.push({ ...token, index });
    index++;
  }

  // state machine
  let state = start;
  input.split("").forEach((char) => {
    state = state(char);
  });
  if (currentToken.value) {
    emitToken(currentToken);
  }
  return tokens;
}

module.exports = scan;
