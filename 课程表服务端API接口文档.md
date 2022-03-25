# 课程表服务端API接口文档

## API V1 接口说明：

- 接口基准地址：`http://localhost:8081`
- 服务端对前端所有域开放权限
- API V1 认证统一使用 Token 认证
- 需要授权的 API ，必须在请求头中添加 `token` 字段提供 token 令牌
  - 例如:
- 使用 HTTP Status Code 标识状态
- 数据返回格式统一使用 JSON

## 支持的请求方法：

- GET（SELECT）：从服务器取出资源（一项或多项）。
- POST（CREATE）：在服务器新建一个资源。
- PATCH（UPDATE）：在服务器更新资源（客户端提供改变的属性）。
- DELETE（DELETE）：从服务器删除资源。

## API列表：

### 1. 登录 / 注册

### 2. 课程模块

### 3. 课程分类模块