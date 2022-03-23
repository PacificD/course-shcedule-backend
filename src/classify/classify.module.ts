/* eslint-disable prettier/prettier */
/*
 * @Author: Pacific_D
 * @Date: 2022-03-23 10:59:23
 * @LastEditTime: 2022-03-23 16:55:02
 * @LastEditors: Pacific_D
 * @Description: 
 * @FilePath: \class-schedule\src\classify\classify.module.ts
 */
import { Module } from '@nestjs/common';
import ClassifyService from './classify.service';
import ClassifyController from './classify.controller';

@Module({
    imports: [],
    controllers: [ClassifyController],
    providers: [ClassifyService]
})
export class ClassifyModule {}
