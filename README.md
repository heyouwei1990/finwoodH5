项目名：[A Vue.js project]，芬木微信官网。本项目第一负责人为 `[蔡博文]`。


## 1. 如何运行

> node版本 `[8.0.0]`

### 1.1 开发环境配置

```sh
# 安装 cnpm 命令行工具。
npm i -g cnpm --registry=https://registry.npm.taobao.org

# 安装（更新） vue-cli 命令行工具。
cnpm i vue-cli -g

# 安装依赖包
cnpm i
```

### 1.2 开发过程

#### 1.2.1 命令

```sh
# 开发
npm run dev

# 发布
npm run build
```

### 1.3 发布

> 发布时的备注
打包前:
    修改static/config.js下的变量$.version为当前要发布的版本号
打包后：
    后端请修改static/config.js中的各变量（api链接url请替换）

### 1.4 相关人员

| 角色 | 人员 |
| --- | --- |
| 产品经理 | 王明辉 |
| 前端开发 | 蔡博文,何友伟 |
| 后台开发 | 李伟,严小俊 |
| 交互设计 | 阮爱斌 |

## 2. 业务介绍

### 2.1 微信官网业务入口

入口地址为 `src/App.vue`

目录结构

    ├── components              //组件
    ├── images                  //图片文件夹
    ├── pages                   //页面
    ├── router                  //路由配置
    ├── store                   //Vuex
    │   ├── modules                 //数据模块
    │   ├── index.js                //主文件
    │   └── types.js				//常量定义
    ├── styles                  //样式
    │   ├── components              //样式模块
    │   ├── base.scss
    │   ├── iconfont.scss           //字体图标
    │   └── mixin.scss			    //scss常量方法
    └── utils                   //工具类
        ├── common.js                //公共方法
        └── share.js                 //微信分享

## 3. 其他

Vue开发文档地址

> https://cn.vuejs.org/

## 4.更新日志

> 2018/4/9    webpack配置文件更新，npm包的更新，优化了打包文件体积
