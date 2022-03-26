/* eslint-disable prettier/prettier */
/*
 * @Author: Pacific_D
 * @Date: 2022-03-22 22:57:06
 * @LastEditTime: 2022-03-26 11:40:39
 * @LastEditors: Pacific_D
 * @Description: 
 * @FilePath: \class-schedule\src\app.module.ts
 */
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClassifyModule } from './classify/classify.module';
import { CoursesModule } from './courses/courses.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'public')
  }), ClassifyModule, UserModule, CoursesModule],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
