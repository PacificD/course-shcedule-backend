/* eslint-disable prettier/prettier */
/*
 * @Author: Pacific_D
 * @Date: 2022-03-24 22:22:39
 * @LastEditTime: 2022-03-24 22:22:39
 * @LastEditors: Pacific_D
 * @Description: 
 * @FilePath: \class-schedule\src\coursesDB\coursesDB.module.ts
 */
import { Module } from '@nestjs/common';
import CoursesDBService from './coursesDB.service';

@Module({
    providers: [CoursesDBService],
    exports: [CoursesDBService]
})
export class CoursesDBModule {}