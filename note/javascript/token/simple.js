const TOKEN = {
  Numeric: "Numeric",
  Punctuator: "Punctuator",
  Space: "Space",
};

const REG = {
  Numeric: /[0-9]/,
  Punctuator: /[\+\-\*/]/,
  Space: /\s/,
};

const tokens = [];
let currentToken = {};

function emitToken(token) {
  currentToken = { type: "", value: "" };
  tokens.push(token);
}

/**
 * 初始状态
 */
function start(char) {
  if (REG.Numeric.test(char)) {
    currentToken = { type: TOKEN.Numeric, value: char };
    return numeric;
  } else if (REG.Punctuator.test(char)) {
    currentToken = { type: TOKEN.Punctuator, value: char };
    return punctuator;
  } else if (REG.Space.test(char)) {
    currentToken = { type: TOKEN.Space, value: char };
    return space;
  }
}

// 进入空格状态
function space(char) {
  if (REG.Space.test(char)) {
    currentToken.value += char;
  } else if (REG.Numeric.test(char)) {
    emitToken(currentToken);
    currentToken = { type: TOKEN.Numeric, value: char };
    return numeric;
  } else if (REG.Punctuator.test(char)) {
    emitToken(currentToken);
    currentToken = { type: TOKEN.Punctuator, value: char };
    return punctuator;
  }
  return space;
}

// 进入数字状态
function numeric(char) {
  if (REG.Numeric.test(char)) {
    currentToken.value += char;
  } else if (REG.Space.test(char)) {
    emitToken(currentToken);
    currentToken = { type: TOKEN.Space, value: char };
    return space;
  } else if (REG.Punctuator.test(char)) {
    emitToken(currentToken);
    currentToken = { type: TOKEN.Punctuator, value: char };
    return punctuator;
  }
  return numeric;
}

// 进入标点符号状态
function punctuator(char) {
  // 无论如何都要发射 因为标点符号在分词阶段不会被拼接起来
  emitToken(currentToken);
  if (REG.Numeric.test(char)) {
    currentToken = { type: TOKEN.Numeric, value: char };
    return numeric;
  } else if (REG.Space.test(char)) {
    currentToken = { type: TOKEN.Space, value: char };
    return space;
  } else if (REG.Punctuator.test(char)) {
    currentToken = { type: TOKEN.Punctuator, value: char };
  }
  return punctuator;
}

function tokenizer(input) {
  let state = start;
  input.split("").forEach((char) => {
    state = state(char);
  });
  // 遍历结束后仍然需要发送一次最后
  tokens.push(currentToken);
  return tokens;
}

console.log(tokenizer("100 + 200 /  300"));
