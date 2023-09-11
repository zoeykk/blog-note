const ERR_CODE = {
  INVALID_START: "INVALID_START",
  MISSING_LP: "MISSING_LP",
  MISSING_RP: "MISSING_RP",
  EMPTY_CONTENT_IN_P: "EMPTY_CONTENT_IN_P",
  MISSING_DQ: "MISSING_DQ",
  EMPTY_CONTENT_IN_DQ: "EMPTY_CONTENT_IN_DQ",
};

const ERR_MSG = {
  INVALID_START: "不能以该类型开头",
  MISSING_LP: "缺少左侧(括号",
  MISSING_RP: "缺少右侧)括号",
  EMPTY_CONTENT_IN_P: "()括号内容不能为空",
  MISSING_DQ: "字符串缺少结束引号",
  EMPTY_CONTENT_IN_DQ: "字符串内容不能为空",
};

module.exports = {
  ERR_CODE,
  ERR_MSG,
};
