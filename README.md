## koa2-server

koa2及Mysql组成的后端，为[koa2-login](https://github.com/Selvin11/koa2-login)中的token注册登录及Github第三方登录提供服务。

## 初始化

* koa2需要node版本7.6以上，才能支持ES6中的async函数

* 启动服务前需要创建数据库及用户表，因此首先得启动本地Mysql

* `./server/db`目录下为Mysql相关配置及SQL语句代码

```bash
npm run init
```

## 启动服务

配合[nodemon](https://github.com/remy/nodemon)，实现服务监听并自重启

```bash
npm run server
```

## 项目相关

* `./config/auth.config.js`文件为自己的Github中新建的OAuth Apps

* 项目中包含一些自己的**注释，请忽略～
