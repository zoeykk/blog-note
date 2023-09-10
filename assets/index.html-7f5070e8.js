import{_ as n,o,c as e,d as m}from"./app-831935e9.js";const c={},a=m('<h3 id="npm-link" tabindex="-1"><a class="header-anchor" href="#npm-link" aria-hidden="true">#</a> npm link</h3><h4 id="背景" tabindex="-1"><a class="header-anchor" href="#背景" aria-hidden="true">#</a> 背景</h4><p>在项目的前期开发过程中，我们会将一些可复用的代码抽离成公共组件，方便管理和维护。但是在调试的过程中，我们需要频繁的打包发布，然后项目再安装依赖，这样调试非常不方便，官方给我们提供了解决方法，就是我们的主角 npm link</p><h4 id="建立链接" tabindex="-1"><a class="header-anchor" href="#建立链接" aria-hidden="true">#</a> 建立链接</h4><p>假设项目名称为 project，公共组件模块名称为 common，现在需要在 project 中使用 common 模块</p><ol><li>在 common 目录下，输入 npm link 将 common 设置为全局的安装包</li><li>在 project 目录下，输入 npm link common(命令中‘common’是 common 模块中 package.json 的 name 属性值)</li></ol><p>现在 project 的 node_modules 里就会添加了 common 模块的软连接，之后修改 common 模块的内容，project 就会实时更新，（common 的导出是直接倒出的，而不是打包成 dist 的，如果打包成 dist 是无法实时更新的，因为 project 引入的就是 dist，而 dist 不是实时更新的）</p><h4 id="解除链接" tabindex="-1"><a class="header-anchor" href="#解除链接" aria-hidden="true">#</a> 解除链接</h4><ul><li>在 project 目录下，输入 npm unlink common 就可以解除对 common 的软连接，然后你可以 npm install common 模块来安装你发布的 common 模块包</li><li>common 模块目录下，输入 npm unlink -g 删除 npm 的全局软链接安装，输入 npm ls -g 可以查看这时候已经不存在 common 该项了</li></ul>',9),i=[a];function t(r,l){return o(),e("div",null,i)}const s=n(c,[["render",t],["__file","index.html.vue"]]);export{s as default};