/**
 * 基本按照大小排序
 */
const numArr = [1, 3, 5, 2, 4];
numArr.sort((a, b) => {
  return a - b;
});
// console.log(numArr);
// [ 1, 2, 3, 4, 5 ]

/**
 * 相同属性合并再按照另一属性排序
 */
const objectArr = [
  {
    name: "aa",
    count: 122,
  },
  {
    name: "bb",
    count: 144,
  },
  {
    name: "aa",
    count: 2,
  },
  {
    name: "bb",
    count: 6,
  },
  {
    name: "aa",
    count: 60,
  },
];
objectArr.sort((a, b) => {
  if (a.name !== b.name) {
    return a.name.localeCompare(b.name);
  }
  return a.count - b.count;
});
// console.log(objectArr);
// [
//   { name: 'aa', count: 2 },
//   { name: 'aa', count: 60 },
//   { name: 'aa', count: 122 },
//   { name: 'bb', count: 6 },
//   { name: 'bb', count: 144 }
// ]

/**
 * 相同属性合并再按照另一属性排序
 */
const sourceArr = [
  {
    name: "aa",
    count: 122,
    type: "a",
  },
  {
    name: "bb",
    count: 144,
    type: "b",
  },
  {
    name: "bb",
    count: 6,
    type: "c",
  },
  {
    name: "aa",
    count: 2,
    type: "c",
  },
  {
    name: "aa",
    count: 2222,
    type: "c",
  },
  {
    name: "aa",
    count: 60,
    type: "a",
  },
];
sourceArr.sort((a, b) => {
  if (a.type != b.type) {
    return a.type.localeCompare(b.type);
  }
  return a.count - b.count;
});
console.log("xx", sourceArr);
