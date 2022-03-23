/*
 * @Author: Pacific_D
 * @Date: 2022-03-22 22:57:06
 * @LastEditTime: 2022-03-23 18:16:19
 * @LastEditors: Pacific_D
 * @Description: 
 * @FilePath: \class-schedule\src\app.module.ts
 */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClassifyModule } from './classify/classify.module';
import { CoursesModule } from './courses/courses.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ClassifyModule, UserModule, CoursesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
