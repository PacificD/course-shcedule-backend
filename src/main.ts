/*
 * @Author: Pacific_D
 * @Date: 2022-03-22 22:57:06
 * @LastEditTime: 2022-03-23 12:44:04
 * @LastEditors: Pacific_D
 * @Description: 
 * @FilePath: \class-schedule\src\main.ts
 */
/* eslint-disable prettier/prettier */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/HttpException';

const port = 8081;

(async () => {
  const app = await NestFactory.create(AppModule);

  //配置全局管道
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));

  // 全局注册错误的过滤器
  app.useGlobalFilters(new HttpExceptionFilter());

  //开启CORS
  app.enableCors({
    credentials: true,
    methods: "GET,POST,PATCH,DELETE",
    origin: ["*",]
  });

  await app.listen(port);
})();
