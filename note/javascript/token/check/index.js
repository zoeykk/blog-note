const checkField = require("./check_filed");
const checkDateField = require("./check_filed_date");
const { TOKEN_TYPE } = require("../token");
const { ERR_CODE } = require("../err/config");

const STATE = {
  INITIAL: "INITIAL",
  LOGIC: "LOGIC",
};

const KEY_WORDS = [TOKEN_TYPE.WORD, TOKEN_TYPE.DATEWORD, TOKEN_TYPE.STRWORD];

function reCheck(tokens, err) {
  function check(tokens, startIndex) {
    let state = STATE.INITIAL;
    let _endIndex = 0;
    for (let i = startIndex; i < tokens.length; i++) {
      const token = tokens[i];
      // 消费token
      if (i > startIndex && i <= _endIndex) {
        continue;
      }
      if (token.type === TOKEN_TYPE.LP) {
        _endIndex = check(tokens, i + 1);
      } else if (KEY_WORDS.includes(token.type)) {
        state = STATE.INITIAL;
      } else if (token.type === TOKEN_TYPE.LOGIC) {
        if (state === STATE.LOGIC) {
          err[token.index] = ERR_CODE.REDUNDANT_LOGIC;
          continue;
        } else {
          state = STATE.LOGIC;
        }
      } else if (token.type === TOKEN_TYPE.FIELD) {
        const { isErr, endIndex } = checkField(tokens, i);
        if (isErr) {
          break;
        } else {
          _endIndex = endIndex;
          state = STATE.INITIAL;
        }
      } else if (token.type === TOKEN_TYPE.FIELD_DATE) {
        const dateFieldResult = checkDateField(tokens, i);
        if (dateFieldResult.isErr) {
          break;
        } else {
          _endIndex = dateFieldResult.endIndex;
          state = STATE.INITIAL;
        }
      } else if (token.type === TOKEN_TYPE.RP) {
        _endIndex = i;
        if (state === STATE.LOGIC) {
          err[token.index] = ERR_CODE.END_IN_LOGIC;
        }
        break;
      } else {
        _endIndex = i;
        err[token.index] = ERR_CODE.INVALID_CHAR;
        break;
      }
    }
    if (state === STATE.LOGIC) {
      err[tokens[tokens.length - 1].index] = ERR_CODE.END_IN_LOGIC;
    }
    return _endIndex;
  }
  check(tokens, 0);
}

module.exports = reCheck;
