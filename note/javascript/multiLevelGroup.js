const list = [
  {
    _id: "0",
    name: "xiaohong",
    gender: "female",
    bu: "go",
    department: "fe",
  },
  {
    _id: "1",
    name: "xiaoming",
    gender: "female",
    bu: "pat",
    department: "fe",
  },
  {
    _id: "2",
    name: "xiaowang",
    gender: "male",
    bu: "go",
    department: "be",
  },
  {
    _id: "3",
    name: "xiaozhang",
    // gender: "male",
    // bu: "pat",
    // department: "be",
  },
];

function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const groupFields = ["gender", "bu", "department"];

/**
 * 生成G6 tree数据
 * @param {Array} list 列表
 * @param {Array} groupFields 顺序排的分组字段
 * @returns 列表按照分组字段分组的树
 */
function genGroupTreeFromList(
  list,
  groupFields,
  { fieldLabel = "name", uuidFun }
) {
  const groupFieldsLen = groupFields.length;
  return list.reduce((acc, cur) => {
    groupFields.reduce((accNest, field, index) => {
      const fieldValue = cur[field];
      if (!fieldValue) {
        return accNest;
      }
      let temp = accNest.find((i) => i[fieldLabel] === fieldValue);
      if (!temp) {
        temp = {
          id: uuidFun(),
          [fieldLabel]: fieldValue,
          level: index,
          childCount: 0,
          children: [],
        };
        accNest.push(temp);
      }
      if (index === groupFieldsLen - 1) {
        temp.children.push({
          ...cur,
          level: groupFieldsLen,
          id: uuidFun(),
        });
      }
      return temp.children;
    }, acc);
    return acc;
  }, []);
}

console.log(
  JSON.stringify(genGroupTreeFromList(list, groupFields, { uuidFun: uuid }))
);

const x = [
  {
    id: "7a9d34c6-68fc-49a0-8f15-12919c991722",
    name: "female",
    level: 0,
    children: [
      {
        id: "9e4a0ee0-eee3-4b09-bd07-07fd6dd1cd9a",
        name: "go",
        level: 1,
        children: [
          {
            id: "0d5928e3-24cc-4b5b-abcf-c8ef8f692e7c",
            name: "fe",
            level: 2,
            children: [
              {
                _id: "0",
                name: "xiaohong",
                gender: "female",
                bu: "go",
                department: "fe",
                level: 3,
                id: "12f2eb42-5d7e-441b-b8b8-dd5a3f620a20",
              },
            ],
          },
        ],
      },
      {
        id: "871576a4-3d1b-4228-af9f-085714033e4f",
        name: "pat",
        level: 1,
        children: [
          {
            id: "e460d341-da65-4de4-99ba-03a459323491",
            name: "fe",
            level: 2,
            children: [
              {
                _id: "1",
                name: "xiaoming",
                gender: "female",
                bu: "pat",
                department: "fe",
                level: 3,
                id: "b17207f2-9a1f-44d0-9b97-6550244ad5d2",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "af216448-3d86-4e10-b322-0709fde08608",
    name: "male",
    level: 0,
    children: [
      {
        id: "ca27e5e9-5d11-4b20-8880-a2674242ce7d",
        name: "go",
        level: 1,
        children: [
          {
            id: "e6ca55b2-76c7-41c1-813f-1a0bbf8c557c",
            name: "be",
            level: 2,
            children: [
              {
                _id: "2",
                name: "xiaowang",
                gender: "male",
                bu: "go",
                department: "be",
                level: 3,
                id: "496a8dfe-5bb5-42c2-9910-ac823137f35a",
              },
            ],
          },
        ],
      },
    ],
  },
];
