/*
 * @Author: Pacific_D
 * @Date: 2022-03-23 10:48:02
 * @LastEditTime: 2022-03-23 10:49:52
 * @LastEditors: Pacific_D
 * @Description: 
 * @FilePath: \class-schedule\src\app.controller.ts
 */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
