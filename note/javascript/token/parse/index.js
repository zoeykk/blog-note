const { TOKEN_TYPE } = require("../token");

/**
 *                                      0	      1	      2	        3	       4	      5	        6	       7       8      9     10      11      12      13        14
 *                                    SPACE	  WORD	STR_WORD	DATE_WORD   LOGIC	  FIELD	 FIELD_DATE	 COLON	  TO	   LP	    RP	    LSB	    RSB	     *	      OTHER
 * 0  初始状态                         [ 0,     0,       0,        0,       1,       8,        2,      -1,     -1,    -1,    -1,     -1,     -1,     -1,       -1]
 * 1  逻辑符号连接状态                  [ 1,     0,       0,        0,      -1,       8,        2,      -1,     -1,    -1,    -1,     -1,     -1,     -1,       -1]
 * 2  日期field开始状态(field)          [ 2,    -1,      -1,       -1,      -1,      -1,       -1,       3,     -1,    -1,    -1,     -1,     -1,     -1,       -1]
 * 3  日期field开始状态(field:)         [ 3,    -1,      -1,       -1,      -1,      -1,       -1,      -1,     -1,    -1,    -1,      4,     -1,     -1,       -1]
 * 4  日期field开始状态(field:[)        [ 4,    -1,      -1,        5,      -1,      -1,       -1,      -1,     -1,    -1,    -1,     -1,     -1,      5,       -1]
 * 5  日期field开始状态(field:[*)       [ 5,    -1,      -1,       -1,      -1,      -1,       -1,      -1,      6,    -1,    -1,     -1,     -1,     -1,       -1]
 * 6  日期field开始状态(field:[* To)    [ 6,    -1,      -1,        7,      -1,      -1,       -1,      -1,     -1,    -1,    -1,     -1,     -1,      7,       -1]
 * 7  日期field开始状态(field:[* To *)  [ 7,    -1,      -1,       -1,      -1,      -1,       -1,      -1,     -1,    -1,    -1,     -1,      0,     -1,       -1]
 * 8  field开始状态(field )             [ 8,    -1,      -1,       -1,      -1,      -1,       -1,       9,     -1,    -1,    -1,     -1,     -1,     -1,       -1]
 * 9  field开始状态(field: )            [ 9,    -1,      -1,       -1,      -1,      -1,       -1,      -1,     -1,    10,    -1,     -1,     -1,     -1,       -1]
 * 10 field开始状态(field:( )           [10,    11,      11,       11,      -1,      -1,       -1,      -1,     -1,    -1,    -1,     -1,     -1,     -1,       -1]
 * 11 field开始状态(field:(* )          [11,    -1,      -1,       -1,      -1,      -1,       -1,      -1,     -1,    -1,     0,     -1,     -1,     -1,       -1]
 */

function parse(tokens) {
  let state = 0;
  const transfer = [
    [0, 0, 0, 0, 1, 8, 2, -1, -1, -1, -1, -1, -1, -1, -1],
    [1, 0, 0, 0, -1, 8, 2, -1, -1, -1, -1, -1, -1, -1, -1],
    [2, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1],
    [3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1],
    [4, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1],
    [5, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1],
    [6, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1],
    [7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, -1],
    [8, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1],
    [9, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1],
    [10, 11, 11, 11, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [11, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1],
  ];
  const getColNum = (token) => {
    const { type } = token;
    switch (type) {
      case TOKEN_TYPE.SPACE:
        return 0;
      case TOKEN_TYPE.WORD:
        return 1;
      case TOKEN_TYPE.STRWORD:
        return 2;
      case TOKEN_TYPE.DATEWORD:
        return 3;
      case TOKEN_TYPE.LOGIC:
        return 4;
      case TOKEN_TYPE.FIELD:
        return 5;
      case TOKEN_TYPE.FIELD_DATE:
        return 6;
      case TOKEN_TYPE.COLON:
        return 7;
      case TOKEN_TYPE.TO:
        return 8;
      case TOKEN_TYPE.LP:
        return 9;
      case TOKEN_TYPE.RP:
        return 10;
      case TOKEN_TYPE.LSB:
        return 11;
      case TOKEN_TYPE.RSB:
        return 12;
      case TOKEN_TYPE.WILDCARD:
        return 13;

      default:
        return -1;
    }
  };
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    state = transfer[state][getColNum(token)];
    console.log(state);
    if (state < 0) {
      token.err = true;
      token.errMsg = "语法错误";
      return false;
    }
    if (i === tokens.length - 1) {
      if (state == 1) {
        token.err = true;
        token.errMsg = "不能以逻辑词开头或者结尾";
        return false;
      }
    }
  }
}
module.exports = parse;
