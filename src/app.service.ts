/*
 * @Author: Pacific_D
 * @Date: 2022-03-23 10:48:04
 * @LastEditTime: 2022-03-23 10:49:52
 * @LastEditors: Pacific_D
 * @Description: 
 * @FilePath: \class-schedule\src\app.service.ts
 */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '当你看到这个页面时，说明服务已经跑起来了！';
  }
}
