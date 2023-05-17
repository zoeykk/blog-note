exports.KEYWORDS = ["TACD", "PUB_D"];
exports.LOGICS = ["NOT", "AND", "OR", "TO"];

exports.TOKEN = {
  WORDCHAR: "WORDCHAR",
  DWORDCHAR: "DWORDCHAR",
  OPT: "OPT",
  SPACE: "SPACE",
  DQUOTE: "DQUOTE",
  // -
  KEYWORD: "KEYWORD", // 关键词
  LOGIC: "LOGIC", // 逻辑词
  QUERY: "QUERY", // 检索词
  LP: "LP", // 左侧小括号
  RP: "RP", // 右侧小括号
  LSB: "LSB", // 左侧中括号
  RSB: "RSB", // 右侧中括号
  COLON: "COLON", // 冒号
};
