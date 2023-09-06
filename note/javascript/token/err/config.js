const ERR_CODE = {
  INVALID_START: "INVALID_START",
  MISSING_LP: "MISSING_LP",
  MISSING_RP: "MISSING_RP",
  EMPTY_CONTENT_IN_P: "EMPTY_CONTENT_IN_P",
};

const ERR_MSG = {
  INVALID_START: "不能以该类型开头",
  MISSING_LP: "缺少左侧(括号",
  MISSING_RP: "缺少右侧)括号",
  EMPTY_CONTENT_IN_P: "()括号内容不能为空",
};

module.exports = {
  ERR_CODE,
  ERR_MSG,
};
