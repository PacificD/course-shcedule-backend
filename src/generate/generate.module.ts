/* eslint-disable prettier/prettier */
/*
 * @Author: Pacific_D
 * @Date: 2022-03-24 13:05:34
 * @LastEditTime: 2022-03-24 22:25:14
 * @LastEditors: Pacific_D
 * @Description: 
 * @FilePath: \class-schedule\src\generate\generate.module.ts
 */
import { Module } from '@nestjs/common';
import { ClassifyDBModule } from 'src/classifyDB/classifyDB.module';
import { CoursesDBModule } from 'src/coursesDB/coursesDB.module';
import GenerateService from './generate.service';

@Module({
    imports: [CoursesDBModule, ClassifyDBModule],
    providers: [GenerateService],
    exports: [GenerateService]
})
export class GenerateModule {}
