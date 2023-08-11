const str = "(1+4)*2+4/2 - 9/3";

function isDigit(char) {
  return /[0-9]/.test(char);
}

function sum(stack) {
  let res = 0;
  console.log(stack);
  while (stack.length) {
    res += stack.pop();
  }
  return res;
}

function calculate(list) {
  function calc(list) {
    let num = 0;
    let preSign = "+";
    const stack = [];
    while (list.length) {
      const c = list.shift();
      if (isDigit(c)) {
        num = 10 * num + Number(c);
      }
      if (c === "(") {
        num = calc(list);
      }
      if ((!isDigit(c) && !/\s/.test(c)) || list.length == 0) {
        switch (preSign) {
          case "+":
            stack.push(num);
            break;
          case "-":
            stack.push(-num);
            break;
          case "*":
            const pre = stack.pop();
            stack.push(pre * num);
            break;
          case "/":
            const pre2 = stack.pop();
            stack.push(pre2 / num);
            break;
        }
        preSign = c;
        num = 0;
      }
      if (c === ")") {
        break;
      }
    }
    return sum(stack);
  }
  return calc(list);
}

console.log(calculate(str.split("")));
