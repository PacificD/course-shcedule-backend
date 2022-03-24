/* eslint-disable prettier/prettier */
/*
 * @Author: Pacific_D
 * @Date: 2022-03-23 18:12:55
 * @LastEditTime: 2022-03-24 13:17:08
 * @LastEditors: Pacific_D
 * @Description: 
 * @FilePath: \class-schedule\src\courses\courses.module.ts
 */
import { Module } from '@nestjs/common';
import { ClassifyModule } from 'src/classify/classify.module';
import { CoursesDBModule } from 'src/coursesDB/coursesDB.module';
import CoursesController from './courses.controller';
import CoursesService from './courses.service';

@Module({
    imports: [CoursesDBModule,ClassifyModule],
    controllers: [CoursesController],
    providers: [CoursesService],
    exports: [CoursesService]
})
export class CoursesModule {}
