import{_ as e,o as i,c as d,d as a}from"./app-d42b5b44.js";const n={},s=a(`<h3 id="更新远程分支到本地" tabindex="-1"><a class="header-anchor" href="#更新远程分支到本地" aria-hidden="true">#</a> 更新远程分支到本地</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>git remote update origin --prune
git remote update origin --p
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="子模块" tabindex="-1"><a class="header-anchor" href="#子模块" aria-hidden="true">#</a> 子模块</h3><ul><li>submodule 仓库地址</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>git@submodule.git
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>在新项目中添加 submodule 并指定 submodule 目录 为 src/common</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>git submodule add git@submodule.git src/common
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h5 id="第一次-clone-包含-submodule-的项目" tabindex="-1"><a class="header-anchor" href="#第一次-clone-包含-submodule-的项目" aria-hidden="true">#</a> 第一次 clone 包含 submodule 的项目</h5><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># clone主项目
git clone git@main.git
# 更新子模块
git submodule update --init --recursive --remote

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,9),l=[s];function t(r,u){return i(),d("div",null,l)}const o=e(n,[["render",t],["__file","index.html.vue"]]);export{o as default};
