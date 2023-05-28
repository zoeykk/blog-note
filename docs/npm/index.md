### npm link

#### 背景

在项目的前期开发过程中，我们会将一些可复用的代码抽离成公共组件，方便管理和维护。但是在调试的过程中，我们需要频繁的打包发布，然后项目再安装依赖，这样调试非常不方便，官方给我们提供了解决方法，就是我们的主角 npm link

#### 建立链接

假设项目名称为 project，公共组件模块名称为 common，现在需要在 project 中使用 common 模块

1. 在 common 目录下，输入 npm link 将 common 设置为全局的安装包
2. 在 project 目录下，输入 npm link common(命令中‘common’是 common 模块中 package.json 的 name 属性值)

现在 project 的 node_modules 里就会添加了 common 模块的软连接，之后修改 common 模块的内容，project 就会实时更新，（common 的导出是直接倒出的，而不是打包成 dist 的，如果打包成 dist 是无法实时更新的，因为 project 引入的就是 dist，而 dist 不是实时更新的）

#### 解除链接

- 在 project 目录下，输入 npm unlink common 就可以解除对 common 的软连接，然后你可以 npm install common 模块来安装你发布的 common 模块包
- common 模块目录下，输入 npm unlink -g 删除 npm 的全局软链接安装，输入 npm ls -g 可以查看这时候已经不存在 common 该项了
