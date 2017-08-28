# vue-music

> Vue.js打造的音乐播放器

## Build Setup

``` bash
npm install -----安装依赖

npm run dev -----运行

npm run build -----打包

node prod.server.js -----打包后运行
```

## 前言

vue学习项目，基于qq音乐API，完成音乐播放和搜索等。


## 实现功能
- [x] 音乐播放
- [x] 音乐控制和自动循环播放
- [x] 音乐搜索
- [x] 播放详情页
- [x] 音乐进度拖拽
- [x] 个人中心模版

## 预览
在线预览地址 👉 http://60.205.181.124:18003/

## 技术栈
- **Vue2.0**：前端页面展示。
- **Vue-cli**：vue手脚架工具。
- **vue-router**：页面路由切换。
- **axios**：向后端发起请求。
- **Vuex**：实现不同组件间的状态共享。
- **ES6**：箭头函数等语法很好用。
- **localStorage**：本地存储，保存歌单和个性化设置。
- **Express**：后端调用qq音乐API，返回数据。
- **Webpack**：vue-cli自带Webpack，添加sass相关loader，其他vue-cli已经配置好了webpack，你只需要安装依赖就可以，使用的时候只需要<style lang="scss"></style>。
- **SASS(SCSS)**：用SCSS做CSS预处理语言。
- **flex**：flex弹性布局，简单适配手机、PC端。
- **CSS3**：CSS3过渡动画及样式。

## 目录结构

项目使用vue-cli手脚架工具搭建，大部分源文件放在src目录下，所有这里只列出src目录结构，其他请参考[vue-cli手脚架](https://segmentfault.com/a/1190000007880723)工具
```
|-- src                              // 源码目录
|   |-- components                   // 公共组件
|       |-- about                    // 关于页
|       |-- find                     // 搜索页
|       |-- footer                   // mini播放器
|       |-- header                   // 页面头部
|       |-- musiclist                // 歌曲列表页
|       |-- play                     // 播放详情页
|       |-- social                   // 个人中心页
|   |-- common                       // 公用资源
|       |-- style                    // 公用sass样式（默认样式）
|   |-- router                       // 配置页面路由
|   |-- App.vue                      // 页面入口文件
|   |-- main.js                      // 程序入口文件，加载各种公共组件
```

## 总结

1. 深入学习vue.js全家桶，使用Vuex管理组件状态很方便。

2. 事先要先想好整个页面结构和组件划分，方便快速开发。

3. 继续完成歌词同步播放。

## About
关于我: http://www.qirenji.info/about

GitHub: https://github.com/qirenji/

E-mail: lyf@qirenji.com
