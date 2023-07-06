### 常见的数据处理

### 递归

- 深拷贝

```
function deepClone(obj) {
  if (typeof obj !== "object" || obj == null) {
    return obj;
  }
  const result = obj instanceof Array ? [] : {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = deepClone(obj[key]);
    }
  }
  return result;
}
```

- 组件递归
菜单/树形控件/折叠面板


### 树的遍历

- BFS

```
function traversal_bfs(tree, cb) {
  let node;
  const list = [...tree];
  while ((node = list.shift())) {
    cb(node);
    node.children && list.push(...node.children);
  }
}
```

- DFS

```
function traversal_dfs(tree, cb) {
  tree.forEach((item) => {
    cb(item); // 先序遍历
    item.children && traversal_dfs(item.children, cb);
    // cb(item); // 后序遍历
  });
}
```

列表转树

```
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
```

### 数组的排列组合

- 回溯

```
function permutate(arr) {
  if (!arr?.length) {
    return [];
  }
  const result = [];
  /**
   * index 当前所在步骤,层级等于arr的长度说明结束，假定arr都是有值的
   * currentList 当前累积维度的数组
   */
  const backtrack = (index, currentList) => {
    if (index === arr.length) {
      result.push([...currentList]);
    } else {
      arr[index].forEach((item) => {
        currentList.push(item);
        backtrack(index + 1, currentList);
        currentList.pop();
      });
    }
  };
  backtrack(0, []);
  return result;
}
```

- reduce

```
function permutate(arr) {
  if (!arr || !Array.isArray(arr)) {
    return [];
  }
  return arr.reduce((acc, cur) => {
    if (acc.length === 0) {
      return cur;
    }
    if (cur.length === 0) {
      return acc;
    }
    const result = [];
    acc.forEach((item) => {
      cur.forEach((citem) => {
        result.push(`${item}-${citem}`);
      });
    });
    return result;
  }, []);
}
```

### 多级嵌套对象分组

```
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
```
