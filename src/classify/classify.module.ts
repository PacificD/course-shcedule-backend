/* eslint-disable prettier/prettier */
/*
 * @Author: Pacific_D
 * @Date: 2022-03-23 10:59:23
 * @LastEditTime: 2022-03-24 12:58:01
 * @LastEditors: Pacific_D
 * @Description: 
 * @FilePath: \class-schedule\src\classify\classify.module.ts
 */
import { Module } from '@nestjs/common';
import ClassifyService from './classify.service';
import ClassifyController from './classify.controller';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [],
    controllers: [ClassifyController],
    providers: [ClassifyService],
    exports: [ClassifyService]
})
export class ClassifyModule {}
