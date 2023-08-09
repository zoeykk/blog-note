const arr = [["a", "b"], ["x", "y"], ["A"]];

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
  if (!arr || !Array.isArray(arr)) {
    return [];
  }
  const result = [];
  /**
   * arr 二维数组 Array
   * index 当前所在步骤
   * currentList 当前累积维度的数组
   */
  const backtrack = (arr, index, currentList) => {
    if (index >= arr.length) {
      result.push([...currentList]);
    } else {
      arr[index].forEach((item) => {
        currentList.push(item);
        backtrack(arr, index + 1, currentList);
        currentList.pop();
      });
    }
  };
  backtrack(arr, 0, []);
  return result;
}
console.log(permutate2(arr));
