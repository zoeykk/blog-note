const nodes = [
  { id: "root0", name: "root0", parentId: null },
  { id: "root1", name: "root1", parentId: null },
  { id: "p1", name: "p1", parentId: "root0" },
  { id: "p1", name: "p1", parentId: "root1" },
  { id: "c0", name: "c0", parentId: "p1" },
];

function convert(data) {
  if (!Array.isArray(data)) return [];
  let result = [];
  let map = {};
  data.forEach((item) => {
    map[item.id] = item;
  });
  data.forEach((item) => {
    let parent = map[item.pid];
    if (parent) {
      (parent.children || (parent.children = [])).push(item);
    } else {
      result.push(item);
    }
  });
  return result;
}

console.log(convert(nodes));
