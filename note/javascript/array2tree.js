const nodes = [
  { id: "root0", name: "root0", pid: null },
  { id: "root1", name: "root1", pid: null },
  { id: "p1", name: "p1", pid: "root0" },
  { id: "p1", name: "p1", pid: "root1" },
  { id: "c0", name: "c0", pid: "p1" },
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
