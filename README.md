# midway-init 项目初始化模板

## 简介

基于 midway3.0 基础脚手架，集成了一些基本功能、组件的模板

助你快速启动一个初始化完备的 midway 应用



本模板基于 midway，详情请查看 https://midwayjs.org 



## 本模板已支持的基本能力、组件

- 跨域
- 参数验证器validate
- swagger
- info信息
- upload上传
- typeorm
- redis（默认禁用）
- rabbitMQ（默认禁用）
- mqtt（默认禁用）
- jwt（默认禁用）
- bull（默认禁用）
- cron（默认禁用）



## 快速使用

##### 安装依赖

```bash
$ npm i
```

##### 检查支持的能力、组件及配置

1. 检查需要支持的组件，查看 src/configuration.ts 文件
2. 检查需要调整的配置，查看 src/config/config.default.ts 文件

##### 启动运行

```
$ npm run dev
$ open http://localhost:7001/
```



## 启用默认禁用的组件能力说明

##### 启用redis、rabbtMQ、jwt

只需直接修改 src 下的 configuration.ts 文件，取消注释即可



## PS

本模板暂未集成的能力和组件，请查看 midway 官方文档