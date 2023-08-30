const TOKEN = {
  LP: "(",
  RP: ")",
  LSB: "[",
  RSB: "]",
  COLON: ":",
  DQ: '"',
};

const TOKEN_TYPE = {
  KEYWORD: "KEYWORD", // KEYWORD = WORD OR STRWORD
  WORD: "WORD",
  STRWORD: "STRWORD",

  LOGIC: "LOGIC",

  FIELD: "FIELD",

  SEPARATOR: "SEPARATOR", // SEPARATOR: [COLON,LP,RP,LSB,RSB]
  COLON: "COLON",
  LP: "LP",
  RP: "RP",
  LSB: "LSB",
  RSB: "RSB",

  SPACE: "SPACE",
};

const FIELDS = ["TACD", "PUB_D"];

const LOGICS = ["NOT", "AND", "OR", "TO"];

module.exports = { TOKEN, TOKEN_TYPE, FIELDS, LOGICS };
