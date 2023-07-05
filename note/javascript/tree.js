const tree = [
  {
    id: "1",
    title: "节点1",
    children: [
      {
        id: "1-1",
        title: "节点1-1",
      },
      {
        id: "1-2",
        title: "节点1-2",
      },
    ],
  },
  {
    id: "2",
    title: "节点2",
    children: [
      {
        id: "2-1",
        title: "节点2-1",
        children: [
          {
            id: "2-1-1",
            title: "节点2-1-1",
          },
        ],
      },
    ],
  },
];

const list = [
  {
    id: "1",
    title: "节点1",
    parentId: "",
  },
  {
    id: "1-1",
    title: "节点1-1",
    parentId: "1",
  },
  {
    id: "1-2",
    title: "节点1-2",
    parentId: "1",
  },
  {
    id: "2",
    title: "节点2",
    parentId: "",
  },
  {
    id: "2-1",
    title: "节点2-1",
    parentId: "2",
  },
];

// BFS
function traversal_bfs(tree, cb) {
  let node;
  const list = [...tree];
  while ((node = list.shift())) {
    cb(node);
    node.children && list.push(...node.children);
  }
}
// traversal_bfs(tree, (node) => {
//   console.log(node.title);
// });

// DFS
function traversal_dfs(tree, cb) {
  tree.forEach((item) => {
    cb(item); // 先序遍历
    item.children && traversal_dfs(item.children, cb);
    // cb(item); // 后序遍历
  });
}
// traversal_dfs(tree, (node) => {
//   console.log(node.title);
// });

// list => tree
function listToTree(list) {
  const nodeMap = list.reduce((map, node) => {
    map[node.id] = node;
    node.children = [];
    return map;
  }, {});
  return list.filter((node) => {
    nodeMap[node.parentId] && nodeMap[node.parentId].children.push(node);
    return !node.parentId;
  });
}

// tree => list
const result = [];
function treeToList(tree, result = [], level = 1) {
  tree.forEach((node) => {
    result.push(node);
    node.level = level++;
    node.children && treeToList(node.children, result, level);
  });
  return result;
}
treeToList(tree, result, 1) 

// function treeToList(tree) {
//   const result = tree.map((node) => {
//     node.level = 1;
//     return node;
//   });
//   for (let i = 0; i < result.length; i++) {
//     if (!result[i].children) continue;
//     const list = result[i].children.map(
//       (node) => ((node.level = result[i].level + 1), node)
//     );
//     result.splice(i + 1, 0, ...list);
//   }
//   return result;
// }
