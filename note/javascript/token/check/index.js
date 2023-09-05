const checkField = require("./check_filed");
const checkDateField = require("./check_filed_date");
const { TOKEN_TYPE } = require("../token");

const STATE = {
  INITIAL: "INITIAL",
  LOGIC: "LOGIC",
};

function check(tokens) {
  let state = STATE.INITIAL;
  let startIndex = 0;
  const pStack = [];
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (i > 0 && i <= startIndex) {
      continue;
    }
    if (token.type === TOKEN_TYPE.SPACE) {
      continue;
    }
    if (token.type === TOKEN_TYPE.LP) {
      pStack.push(i);
      continue;
    }
    if (token.type === TOKEN_TYPE.RP) {
      pStack.pop();
    }
    if (
      [TOKEN_TYPE.WORD, TOKEN_TYPE.DATEWORD, TOKEN_TYPE.STRWORD].includes(
        token.type
      )
    ) {
      state = STATE.INITIAL;
    } else if (token.type === TOKEN_TYPE.LOGIC) {
      if (state === STATE.LOGIC) {
        token.err = true;
        token.errMsg = "不能相连的逻辑词";
        continue;
      } else {
        state = STATE.LOGIC;
      }
    } else if (token.type === TOKEN_TYPE.FIELD) {
      const { isErr, endIndex } = checkField(tokens, i);
      if (isErr) {
        break;
      } else {
        startIndex = endIndex;
        state = STATE.INITIAL;
      }
    } else if (token.type === TOKEN_TYPE.FIELD_DATE) {
      const dateFieldResult = checkDateField(tokens, i);
      if (dateFieldResult.isErr) {
        break;
      } else {
        startIndex = dateFieldResult.endIndex;
        state = STATE.INITIAL;
      }
    }
  }
  return tokens;
}

module.exports = check;
