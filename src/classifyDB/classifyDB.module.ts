/* eslint-disable prettier/prettier */
/*
 * @Author: Pacific_D
 * @Date: 2022-03-24 22:23:54
 * @LastEditTime: 2022-03-24 22:23:54
 * @LastEditors: Pacific_D
 * @Description: 
 * @FilePath: \class-schedule\src\classifyDB\classifyDB.module.ts
 */
import { Module } from '@nestjs/common';
import ClassifyDBService from './classifyDB.service';

@Module({
    providers: [ClassifyDBService],
    exports: [ClassifyDBService]
})
export class ClassifyDBModule {}