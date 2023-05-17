function splitGroup(srcStr, splitCount) {
  const len = srcStr.length,
    result = [];
  const groupCount = Math.ceil(len / splitCount);
  for (let i = 0; i < groupCount; i++) {
    result.push(srcStr.slice(i * splitCount, (i + 1) * splitCount));
  }
  return result;
}

function splitLine(srcArr, splitCount) {
  const len = srcArr.length,
    result = [];
  const groupCount = Math.ceil(len / splitCount);
  for (let i = 0; i < groupCount; i++) {
    const start = i * splitCount;
    const end = (i + 1) * splitCount;
    const data = srcArr.slice(start, end);
    const item = {
      start: start + 1,
      end: i === groupCount - 1 ? data.join("").length : end,
      data,
    };
    result.push(item);
  }
  return result;
}

console.log(splitLine(splitGroup("aaabbbcccdddeeefffggghhhiiijjjkkkl", 3), 10));
