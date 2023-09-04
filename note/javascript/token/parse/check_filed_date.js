const { TOKEN_TYPE } = require("../token");

const STATE = {
  INITIAL: "INITIAL",
  FIELD: "FIELD",
  COLON: "COLON",
  LSB: "LSB",
  RANGE_START: "RANGE_START",
  TO: "TO",
  RANGE_END: "RANGE_END",
  FINISHED: "FINISHED",
};

const transfer = new Map();
const map0 = new Map();
map0.set(TOKEN_TYPE.FIELD_DATE, STATE.FIELD);
transfer.set(STATE.INITIAL, map0);
const map1 = new Map();
map1.set(TOKEN_TYPE.COLON, STATE.COLON);
transfer.set(STATE.FIELD, map1);
const map2 = new Map();
map2.set(TOKEN_TYPE.LSB, STATE.LSB);
transfer.set(STATE.COLON, map2);
const map3 = new Map();
map3.set(TOKEN_TYPE.DATEWORD, STATE.RANGE_START);
map3.set(TOKEN_TYPE.WILDCARD, STATE.RANGE_START);
transfer.set(STATE.LSB, map3);
const map4 = new Map();
map4.set(TOKEN_TYPE.TO, STATE.TO);
transfer.set(STATE.RANGE_START, map4);
const map5 = new Map();
map5.set(TOKEN_TYPE.DATEWORD, STATE.RANGE_END);
map5.set(TOKEN_TYPE.WILDCARD, STATE.RANGE_END);
transfer.set(STATE.TO, map5);
const map6 = new Map();
map6.set(TOKEN_TYPE.RSB, STATE.FINISHED);
transfer.set(STATE.RANGE_END, map6);

function check(tokens, index) {
  let state = STATE.INITIAL;
  let endIndex = 0;
  for (let i = index; i < tokens.length; i++) {
    const token = tokens[i];
    if (!transfer.get(state).has(token.type)) {
      token.err = true;
      token.errMsg = "FIELD_DATE语法错误";
      endIndex = i;
      break;
    } else {
      state = transfer.get(state).get(token.type);
    }
    endIndex = i;
  }
  if (state === STATE.FINISHED) {
    console.log("解析成功了");
  } else {
    tokens[index].err = true;
    tokens[index].errMsg = "FIELD_DATE语法错误";
  }
  return endIndex;
}
module.exports = check;
