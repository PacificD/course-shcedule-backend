/*
 * @Author: Pacific_D
 * @Date: 2022-03-22 22:57:06
 * @LastEditTime: 2022-03-23 16:54:48
 * @LastEditors: Pacific_D
 * @Description: 
 * @FilePath: \class-schedule\src\app.module.ts
 */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClassifyModule } from './classify/classify.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ClassifyModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
