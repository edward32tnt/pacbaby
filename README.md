[![Project using Jinkela](https://img.shields.io/badge/Jinkela_Vikingr-Powered-brightgreen.svg)](http://info.bilibili.co/pages/viewpage.action?pageId=5423793) [![Project include Saga](https://img.shields.io/badge/Saga-Include-brightgreen.svg)](http://info.bilibili.co/pages/viewpage.action?pageId=3692459)

# Vikingr 站点使用指南
# 需配合@bilibili/vikingr 使用

## 项目启动
```javascript
npm i --registry=http://registry.npm.bilibili.co //安装所需要的包

env DEBUG='app:*' node app.js //调试

node app.js //启动服务

```

# 目录结构
```
.
├── README.md
├── apps.js                       [主入口]
├── controller                    [控制器]
│   └── demo
│       ├── demo.controller.js
│       └── index.js              [demo路由]
├── package.json
└── routes.js                     [主路由]
```
