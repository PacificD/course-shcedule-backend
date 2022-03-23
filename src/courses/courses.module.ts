/* eslint-disable prettier/prettier */
/*
 * @Author: Pacific_D
 * @Date: 2022-03-23 18:12:55
 * @LastEditTime: 2022-03-23 21:55:55
 * @LastEditors: Pacific_D
 * @Description: 
 * @FilePath: \class-schedule\src\courses\courses.module.ts
 */
import { Module } from '@nestjs/common';
import CoursesController from './courses.controller';
import CoursesService from './courses.service';

@Module({
    imports: [],
    controllers: [CoursesController],
    providers: [CoursesService]
})
export class CoursesModule {}
