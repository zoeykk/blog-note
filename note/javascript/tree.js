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

const groupFields = ["gender", "bu", "department"];
const root = {
  level: 0,
  field: "root",
};

function genChildren(list, field) {
  const children = [];
  list.forEach((item) => {
    if (!children.includes(item[field])) {
      children.push(item[field]);
    }
  });
  const level = groupFields.indexOf(field)
  return children.map((item) => ({
    level,
    field: item,
  }));
}
root.children = genChildren(list, groupFields[0]);
root.children.forEach((item) => {
  const filterList = list.filter((i) => item.field === i[groupFields[0]]);
  item.children = genChildren(filterList, groupFields[1])
});
console.log(JSON.stringify(root));
