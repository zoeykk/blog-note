const list = [
  {
    id: "0",
    name: "xiaohong",
    gender: "female",
    bu: "go",
    department: "fe",
  },
  {
    id: "1",
    name: "xiaoming",
    gender: "female",
    bu: "pat",
    department: "fe",
  },
  {
    id: "2",
    name: "xiaowang",
    gender: "male",
    bu: "go",
    department: "be",
  },
  {
    id: "3",
    name: "xiaozhang",
    gender: "male",
    bu: "pat",
    department: "be",
  },
];

const mapId = {};

list.forEach((item) => {
  mapId[item.id] = item;
});

const groupFields = ["gender", "bu", "department"];
const root = {
  field: "root",
  level: -1,
};

function genChildren(list, field) {
  if (!list?.length) {
    return [];
  }
  const level = groupFields.indexOf(field);
  const result = list.reduce((acc, cur) => {
    if (acc[cur[field]]) {
      acc[cur[field]].push(cur);
    } else {
      acc[cur[field]] = [cur];
    }
    return acc;
  }, {});
  return Object.keys(result).map((item) => {
    return {
      field: item,
      level,
      children: result[item],
    };
  });
}

groupFields.forEach((field, level) => {
  if (level === 0) {
    if (list?.length) {
      root.children = genChildren(list, field);
    }
  }
  if (level === 1) {
    root.children?.forEach((item) => {
      if (item.children?.length) {
        item.children = genChildren(item.children, field);
      }
    });
  }
  if (level === 2) {
    root.children?.forEach((item) => {
      item.children?.forEach((citem) => {
        if (citem.children?.length) {
          citem.children = genChildren(citem.children, field);
        }
      });
    });
  }
});
const x = {
  field: "root",
  level: -1,
  children: [
    {
      field: "female",
      level: 0,
      children: [
        {
          field: "go",
          level: 1,
          children: [
            {
              field: "fe",
              level: 2,
              children: [
                {
                  id: "0",
                  name: "xiaohong",
                  gender: "female",
                  bu: "go",
                  department: "fe",
                },
              ],
            },
          ],
        },
        {
          field: "pat",
          level: 1,
          children: [
            {
              field: "fe",
              level: 2,
              children: [
                {
                  id: "1",
                  name: "xiaoming",
                  gender: "female",
                  bu: "pat",
                  department: "fe",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      field: "male",
      level: 0,
      children: [
        {
          field: "go",
          level: 1,
          children: [
            {
              field: "be",
              level: 2,
              children: [
                {
                  id: "2",
                  name: "xiaowang",
                  gender: "male",
                  bu: "go",
                  department: "be",
                },
              ],
            },
          ],
        },
        {
          field: "pat",
          level: 1,
          children: [
            {
              field: "be",
              level: 2,
              children: [
                {
                  id: "3",
                  name: "xiaozhang",
                  gender: "male",
                  bu: "pat",
                  department: "be",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
console.log(JSON.stringify(root));
