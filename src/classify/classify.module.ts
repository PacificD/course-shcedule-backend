/* eslint-disable prettier/prettier */
/*
 * @Author: Pacific_D
 * @Date: 2022-03-23 10:59:23
 * @LastEditTime: 2022-04-05 17:56:01
 * @LastEditors: Pacific_D
 * @Description: 
 * @FilePath: \class-schedule\src\classify\classify.module.ts
 */
import { Module } from '@nestjs/common';
import ClassifyService from './classify.service';
import ClassifyController from './classify.controller';
import { ClassifyDBModule } from 'src/classifyDB/classifyDB.module';

@Module({
    imports: [ClassifyDBModule],
    controllers: [ClassifyController],
    providers: [ClassifyService],
    exports: [ClassifyService]
})
export class ClassifyModule {}
