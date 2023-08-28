const TOKEN = {
  // OPT
  LP: "(", // 左侧小括号
  RP: ")", // 右侧小括号
  LSB: "[", // 左侧中括号
  RSB: "]", // 右侧中括号
  COLON: ":", // 冒号
  DQ: '"', // 冒号
};

const TOKEN_TYPE = {
  SPACE: "SPACE",
  // CELL
  WORD: "WORD",
  STRWORD: "STRWORD",
  // -
  FIELD: "FIELD", // 关键词
  LOGIC: "LOGIC", // 逻辑词
  // OPT
  LP: "LP", // 左侧小括号
  RP: "RP", // 右侧小括号
  LSB: "LSB", // 左侧中括号
  RSB: "RSB", // 右侧中括号
  COLON: "COLON", // 冒号
};

const FIELDS = ["TACD", "PUB_D"];

const LOGICS = ["NOT", "AND", "OR", "TO"];

module.exports = { TOKEN, TOKEN_TYPE, FIELDS, LOGICS };
