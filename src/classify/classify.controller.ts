/* eslint-disable prettier/prettier */
/*
 * @Author: Pacific_D
 * @Date: 2022-03-23 11:04:02
 * @LastEditTime: 2022-03-23 17:36:44
 * @LastEditors: Pacific_D
 * @Description: 
 * @FilePath: \class-schedule\src\classify\classify.controller.ts
 */
import { Body, Controller, Post, UseGuards, Headers, Delete, Param } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { UserService } from "src/user/user.service";
import ClassifyService from "./classify.service";
import ClassifyDto from "./dto/classify.dto";


@Controller('/classify')
export default class ClassifyController {
    private userService: UserService
    private userId: string

    constructor(private readonly classifyService: ClassifyService) { 
        this.userService = new UserService(new JwtService({}))
    }


    @Post()
    @UseGuards(AuthGuard('jwt'))
    async addClassify(@Body() ClassifyDto: ClassifyDto, @Headers() headers: Record<string, string>) {
        await this.userService.getUserInfo(headers.token).then(res => {
            this.userId = res.id            
        })
        return this.classifyService.addClassify(ClassifyDto, this.userId)
    }

    @Delete(':classifyId')
    @UseGuards(AuthGuard('jwt'))
    async deleteClassify(@Param('classifyId') classifyId: string, @Headers() headers: Record<string, string>){
        await this.userService.getUserInfo(headers.token).then(res => {
            this.userId = res.id            
        })
        return this.classifyService.deleteClassify(classifyId, this.userId)
    }
}