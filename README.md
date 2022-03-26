# class-schedule-backend

> [🔗 Repository Link](https://github.com/PacificD/course-shcedule-backend)
>
> [@PacificD](https://github.com/PacificD)
>
> WISStudio工作室前端二轮考核的服务端
>
> 接口文档详见：`课程表服务端API接口文档.md`

## 启动

- 在带有src的根目录下执行`npm install`
- `npm run start`

## 打包

- 在带有src的根目录下执行`npm run build`后得到dist文件夹
- 将**package.json**，ts相关配置文件放到dist文件夹中
- 修改**tsconfig.build.tsbuildinfo**中对noe_modules引用的路径

## 使用的框架/库

- `Nest.js`（基于express与typescript的web框架）

- `lowdb`（基于JSON的轻量级数据库）存储数据。为了方便大一同学使用，只需要将打包好的文件拉到本地后npm install安装依赖，无需安装数据库环境。
- token鉴权：
  - `@nestjs/jwt`
  - `@nestjs/passport`
  - `passport`
  - `passport-jwt`
  - `passport-local`
- `@nestjs/serve-static`响应静态资源
- `uuid`，生成时间戳ID
- 验证参数：
  - `class-validator`
  - `class-transformer`
