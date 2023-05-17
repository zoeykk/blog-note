const data = {
  value: 1,
  lChild: {
    value: 2,
    lChild: {
      value: 4,
      lChild: null,
      rChild: null,
    },
    rChild: {
      value: 5,
      lChild: null,
      rChild: null,
    },
  },
  rChild: {
    value: 3,
    lChild: {
      value: 6,
      lChild: null,
      rChild: null,
    },
    rChild: {
      value: 7,
      lChild: null,
      rChild: null,
    },
  },
};

/**
 * DFS 深度优先搜索
 * @param {BT} root
 */
function traverse(root) {
  if (!root) {
    return;
  }
  // 前序 根左右
  console.log(root.value);
  traverse(root.lChild);
  // 中序 左根右
  //   console.log(root.value);
  traverse(root.rChild);
  // 后序 左右根
  //   console.log(root.value);
}

/**
 * DFS 深度优先搜索 非递归
 * @param {BT} root
 */
function DepthFirstSearch(biTree) {
  const stack = [];
  stack.push(biTree);
  while (stack.length != 0) {
    const node = stack.pop();
    console.log(node.value);
    if (node.rChild) {
      stack.push(node.rChild);
    }
    if (node.lChild) {
      stack.push(node.lChild);
    }
  }
}

DepthFirstSearch(data);
