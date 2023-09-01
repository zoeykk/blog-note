const TOKEN = {
  LP: "(",
  RP: ")",
  LSB: "[",
  RSB: "]",
  COLON: ":",
  DQ: '"',
};

const TOKEN_TYPE = {
  WORD: "WORD",
  STRWORD: "STRWORD",
  DATEWORD: "DATEWORD",

  LOGIC: "LOGIC",

  FIELD: "FIELD",
  FIELD_DATE: "FIELD_DATE",

  SEPARATOR: "SEPARATOR", // SEPARATOR: [COLON,LP,RP,LSB,RSB]
  COLON: "COLON",
  LP: "LP",
  RP: "RP",
  LSB: "LSB",
  RSB: "RSB",

  WILDCARD: "WILDCARD",

  TO: "TO",

  SPACE: "SPACE",
};

const FIELDS = [
  "TACD",
  "TAC",
  "T",
  "A",
  "C",
  "D",
  "PAT_NUM",
  "Assignee",
  "Inventor",
  "Authority",
  "IPC",
  "CPC",
];

const DATE_FIELDS = ["APP_D", "PUB_D", "PRI_D"];

const LOGICS = ["NOT", "AND", "OR"];

module.exports = { TOKEN, TOKEN_TYPE, FIELDS, DATE_FIELDS, LOGICS };
