const ERR_CODE = {
  INVALID_START: "INVALID_START",
  MISSING_LP: "MISSING_LP",
  MISSING_RP: "MISSING_RP",
  EMPTY_CONTENT_IN_P: "EMPTY_CONTENT_IN_P",
  MISSING_DQ: "MISSING_DQ",
  EMPTY_CONTENT_IN_DQ: "EMPTY_CONTENT_IN_DQ",
  REDUNDANT_LOGIC: "REDUNDANT_LOGIC",
  END_IN_LOGIC: "END_IN_LOGIC",
  INVALID_CHAR: "INVALID_CHAR",
};

const ERR_MSG = {
  INVALID_START: "不能以该类型开头",
  MISSING_LP: "缺少左侧(括号",
  MISSING_RP: "缺少右侧)括号",
  EMPTY_CONTENT_IN_P: "()括号内容不能为空",
  MISSING_DQ: "字符串缺少结束引号",
  EMPTY_CONTENT_IN_DQ: "字符串内容不能为空",
  REDUNDANT_LOGIC: "不能相连的逻辑词",
  END_IN_LOGIC: "不能以逻辑词结尾",
  INVALID_CHAR: "无效字符，语法错误",
};

module.exports = {
  ERR_CODE,
  ERR_MSG,
};