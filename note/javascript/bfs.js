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
 * BFS 广度优先搜索
 * @param {BT} root
 */
function traverse(biTree) {
  const queue = [];
  queue.push(biTree);
  while (queue.length != 0) {
    const node = queue.shift();
    // console.log(node.value);
    if (node.lChild) {
      queue.push(node.lChild);
    }
    if (node.rChild) {
      queue.push(node.rChild);
    }
  }
}

traverse(data);
