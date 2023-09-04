const { TOKEN_TYPE } = require("../token");
const checkNormal = require("./check_normal");

function check(tokens, index) {
  const stack = [];
  const contentStack = [];
  let endIndex = 0;
  let startIndex = 0;
  for (let i = index; i < tokens.length; i++) {
    const token = tokens[i];
    if (token.type === TOKEN_TYPE.LP) {
      stack.push(i);
      continue;
    }
    if (i <= startIndex) {
      continue;
    }
    if (token.type === TOKEN_TYPE.RP) {
      const pop = stack.pop();
      contentStack.push(tokens.slice(pop + 1, i));
      if (stack.length === 0) {
        endIndex = i;
        break;
      }
    }
    if (
      [
        TOKEN_TYPE.WORD,
        TOKEN_TYPE.STRWORD,
        TOKEN_TYPE.DATEWORD,
        TOKEN_TYPE.SPACE,
      ].includes(token.type)
    ) {
      startIndex = checkNormal(tokens, i);
      console.log({ startIndex });
    }
  }
  console.log(contentStack);
  return endIndex;
}
module.exports = check;
