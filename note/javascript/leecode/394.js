const s = "x3[a]2[b]"; //返回 "aaabcbc".
// const s = "3[a2[c]]", //返回 "accaccacc".
// const s = "2[abc]3[cd]ef", //返回 "abcabccdcdcdef".

const numStack = [];
const strStack = [];
let num = 0,
  str = "",
  res = "";
for (let i = 0; i < s.length; i++) {
  const char = s[i];
  if (char == "[") {
    numStack.push(num);
    num = 0;
  } else if (char == "]") {
    res += strStack.pop().repeat(+numStack.pop());
  } else if (Number.isInteger(+char)) {
    num = num * 10 + Number(char);
  } else if (/[a-zA-Z]/.test(char)) {
    str += char;
    strStack.push(str);
    str = "";
  }
}

console.log(res);
