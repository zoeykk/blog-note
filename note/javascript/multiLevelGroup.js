const list = [
  {
    id: "0",
    name: "小红",
    gender: "女",
    bu: "新药",
    department: "前端",
  },
  {
    id: "1",
    name: "小明",
    gender: "男",
    bu: "新药",
    department: "后端",
  },
  {
    id: "2",
    name: "小张",
    gender: "女",
    bu: "基础库",
    department: "前端",
  },
  {
    id: "3",
    name: "小李",
    gender: "男",
    bu: "投融资",
    department: "后端",
  },
];

const groupFields = ["gender", "bu", "department"];

/**
 * @param {Array} list 列表
 * @param {Array} groupFields 顺序排的分组字段
 * @returns 列表按照分组字段分组的树
 */
function genGroupTreeFromList(list, groupFields) {
  const groupFieldsLen = groupFields.length;
  return list.reduce((acc, cur) => {
    groupFields.reduce((accNest, field, index) => {
      const fieldValue = cur[field];
      if (!fieldValue) {
        return accNest;
      }
      let temp = accNest.find((i) => i.name === fieldValue);
      if (!temp) {
        temp = {
          name: fieldValue,
          level: index,
          children: [],
        };
        accNest.push(temp);
      }
      if (index === groupFieldsLen - 1) {
        temp.children.push({
          ...cur,
          level: groupFieldsLen,
        });
      }
      return temp.children;
    }, acc);
    return acc;
  }, []);
}

console.log(JSON.stringify(genGroupTreeFromList(list, groupFields)));

const x = [
  {
    name: "女",
    level: 0,
    children: [
      {
        name: "新药",
        level: 1,
        children: [
          {
            name: "前端",
            level: 2,
            children: [
              {
                id: "0",
                name: "小红",
                gender: "女",
                bu: "新药",
                department: "前端",
                level: 3,
              },
            ],
          },
        ],
      },
      {
        name: "基础库",
        level: 1,
        children: [
          {
            name: "前端",
            level: 2,
            children: [
              {
                id: "2",
                name: "小张",
                gender: "女",
                bu: "基础库",
                department: "前端",
                level: 3,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "男",
    level: 0,
    children: [
      {
        name: "新药",
        level: 1,
        children: [
          {
            name: "后端",
            level: 2,
            children: [
              {
                id: "1",
                name: "小明",
                gender: "男",
                bu: "新药",
                department: "后端",
                level: 3,
              },
            ],
          },
        ],
      },
    ],
  },
];
