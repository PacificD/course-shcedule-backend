/*
 * @Author: Pacific_D
 * @Date: 2022-03-22 22:57:06
 * @LastEditTime: 2022-03-23 10:54:10
 * @LastEditors: Pacific_D
 * @Description: 
 * @FilePath: \class-schedule\src\main.ts
 */
/* eslint-disable prettier/prettier */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
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

  //配置swagger
  const options = new DocumentBuilder()
    .setTitle('课程表')
    .setDescription('课程表接口列表')
    .setVersion('1.0')
    .addTag('用户')
    .addTag('课程分类')
    .addTag('每周课程')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(port);
})();
