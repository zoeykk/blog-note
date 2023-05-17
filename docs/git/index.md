### 更新远程分支到本地

```
git remote update origin --prune
git remote update origin --p
```

### 子模块

- submodule 仓库地址

```
git@submodule.git
```

- 在新项目中添加 submodule 并指定 submodule 目录 为 src/common

```
git submodule add git@submodule.git src/common
```

##### 第一次 clone 包含 submodule 的项目

```
# clone主项目
git clone git@main.git
# 更新子模块
git submodule update --init --recursive --remote

```
