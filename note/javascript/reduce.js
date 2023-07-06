const arr = [["a", "b"], ["x", "y"], ["1"]];

// 两两组合
/**
 * reduce
 */
function permutate(arr) {
  if (!arr || !Array.isArray(arr)) {
    return [];
  }
  return arr.reduce((acc, cur) => {
    if (acc.length === 0) {
      return cur;
    }
    if (cur.length === 0) {
      return acc;
    }
    const result = [];
    acc.forEach((item) => {
      cur.forEach((citem) => {
        result.push(`${item}-${citem}`);
      });
    });
    return result;
  }, []);
}
console.log(permutate(arr));

/**
 * 回溯
 */
function permutate2(arr) {
  if (!arr?.length) {
    return [];
  }
  const result = [];
  /**
   * index 当前所在步骤,层级等于arr的长度说明结束，假定arr都是有值的
   * currentList 当前累积维度的数组
   */
  const backtrack = (index, currentList) => {
    if (index === arr.length) {
      result.push([...currentList]);
    } else {
      arr[index].forEach((item) => {
        currentList.push(item);
        backtrack(index + 1, currentList);
        currentList.pop();
      });
    }
  };
  backtrack(0, []);
  return result;
}
console.log(permutate2(arr));
