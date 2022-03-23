/* eslint-disable prettier/prettier */
/*
 * @Author: Pacific_D
 * @Date: 2022-03-23 11:04:02
 * @LastEditTime: 2022-03-23 11:37:27
 * @LastEditors: Pacific_D
 * @Description: 
 * @FilePath: \class-schedule\src\classify\classify.controller.ts
 */
import { Body, Controller, Post } from "@nestjs/common";
import ClassifyService from "./classify.service";
import ClassifyDto from "./dto/classify.dto";


@Controller('/classify')
export default class ClassifyController {
    constructor(private readonly classifyService: ClassifyService){}

    @Post()
    addClassify(@Body() ClassifyDto: ClassifyDto){
        return this.classifyService.addClassify(ClassifyDto)
    }
}