# 说明文档

## `srqCli`: 一个帮助你快速搭建和开发前端项目的 CLI

> 主要编译模板来源 coderwhy 大神~

如何安装？

```shell
npm install srq-cli -g
```

## 创建项目

目前支持 Vue 以及 Vue@next~

vue 项目模块已经帮你配置：

- 常用的目录结构（你可以在此基础上修改）
- vue.config.js（其中配置了别名，你可以自行修改和配置更多）
- axios（网络请求 axios 的安装以及二次封装）
- vue-router（router 的安装和配置，另外有路由的动态加载，后面详细说明）
- vuex（vuex 的安装和配置，另外有动态加载子模块，后面详细说明）

创建项目

```shell
srq create your_project_name
```

自动拉取项目模板、安装项目依赖

## 项目开发

项目开发目前提供三个功能：

- 创建 Vue 组件
- 创建 Vue 页面，并配置路由
- 创建 Vuex 子模块(暂未完成)

### 创建 Vue 组件：

```shell
srq addcpn YourComponentName # 例如srq addcpn NavBar，默认会存放到src/components文件夹中
srq addcpn YourComponentName -d src/pages/home # 也可以指定存放的具体文件夹
```

### 创建 Vue 页面，并配置路由

```shell
srq addpage YourPageName # 例如srq addpage Home，默认会放到src/pages/home/Home.vue中，并且会创建src/pages/home/router.js
srq addpage YourPageName -d src/views # 也可以指定文件夹，但需要手动集成路由
```

为什么会创建 router.js 文件：

- `router.js`文件是路由的其中一个配置；
- 创建该文件中 `src/router/index.js`中会自动加载到路由的 `routes`配置中，不需要手动配置了（如果是自己配置的文件夹需要手动配置）

`src/router/index.js`中已经完成如下操作：

```js
// 动态加载pages中所有的路由文件
const files = require.context('@/pages', true, /router\.js$/);
const routes = files.keys().map((key) => {
  const page = require('@/pages' + key.replace('.', ''));
  return page.default;
});
```

### 创建 Vue3 页面，并配置路由

```shell
srq add3page YourPageName # 例如srq addpage Home，默认会放到src/pages/home/Home.vue中，并且会创建src/router/home/Home.ts
srq add3page YourPageName -d src/views # 也可以指定文件夹
```
