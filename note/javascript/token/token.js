const TOKEN = {
  LP: "(",
  RP: ")",
  LSB: "[",
  RSB: "]",
  COLON: ":",
  DQ: '"',
};

const TOKEN_TYPE = {
  SPACE: "SPACE",

  WORD: "WORD",
  STRWORD: "STRWORD",
  DATEWORD: "DATEWORD",

  LOGIC: "LOGIC",

  FIELD: "FIELD",
  FIELD_DATE: "FIELD_DATE",

  COLON: "COLON",
  TO: "TO",

  SEPARATOR: "SEPARATOR", // SEPARATOR: [COLON,LP,RP,LSB,RSB]
  LP: "LP",
  RP: "RP",
  LSB: "LSB",
  RSB: "RSB",

  WILDCARD: "WILDCARD",

  OTHER: "OTHER",
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
