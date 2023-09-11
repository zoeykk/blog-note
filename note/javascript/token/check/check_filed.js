const { TOKEN_TYPE } = require("../token");

const STATE = {
  INITIAL: "INITIAL",
  FIELD: "FIELD",
  COLON: "COLON",
  LP: "LP",
  KEYWORD: "KEYWORD",
  LOGIC: "LOGIC",
  FINISHED: "FINISHED",
};

const transfer = new Map();
const map0 = new Map();
map0.set(TOKEN_TYPE.FIELD, STATE.FIELD);
transfer.set(STATE.INITIAL, map0);
const map1 = new Map();
map1.set(TOKEN_TYPE.COLON, STATE.COLON);
transfer.set(STATE.FIELD, map1);
const map2 = new Map();
map2.set(TOKEN_TYPE.LP, STATE.LP);
transfer.set(STATE.COLON, map2);
const map3 = new Map();
map3.set(TOKEN_TYPE.WORD, STATE.KEYWORD);
map3.set(TOKEN_TYPE.DATEWORD, STATE.KEYWORD);
map3.set(TOKEN_TYPE.STRWORD, STATE.KEYWORD);
transfer.set(STATE.LP, map3);
const map4 = new Map();
map4.set(TOKEN_TYPE.WORD, STATE.KEYWORD);
map4.set(TOKEN_TYPE.DATEWORD, STATE.KEYWORD);
map4.set(TOKEN_TYPE.STRWORD, STATE.KEYWORD);
map4.set(TOKEN_TYPE.LOGIC, STATE.LOGIC);
map4.set(TOKEN_TYPE.RP, STATE.FINISHED);
transfer.set(STATE.KEYWORD, map4);
const map5 = new Map();
map5.set(TOKEN_TYPE.WORD, STATE.KEYWORD);
map5.set(TOKEN_TYPE.DATEWORD, STATE.KEYWORD);
map5.set(TOKEN_TYPE.STRWORD, STATE.KEYWORD);
transfer.set(STATE.LOGIC, map5);

function check(tokens, index) {
  let state = STATE.INITIAL,
    endIndex = 0,
    isErr = false;
  const pStack = [];
  for (let i = index; i < tokens.length; i++) {
    const token = tokens[i];
    endIndex = i;
    if (token.type === TOKEN_TYPE.LP) {
      pStack.push(i);
      if (pStack.length > 1) {
        continue;
      }
    }
    if (token.type === TOKEN_TYPE.RP) {
      if (!pStack.length) {
        isErr = true;
        endIndex = i;
        break;
      } else {
        const pop = pStack.pop();
        if (pStack.length !== 0) {
          continue;
        }
      }
    }
    if (transfer.get(state).has(token.type)) {
      state = transfer.get(state).get(token.type);
      if (state === STATE.FINISHED) {
        console.log("FIELD 解析成功");
        break;
      }
    } else {
      isErr = true;
      break;
    }
  }
  if (isErr || state !== STATE.FINISHED) {
    tokens[index].err = `${tokens[index].value}语法错误`;
  }
  return {
    isErr,
    endIndex,
  };
}
module.exports = check;
