/* eslint-disable prettier/prettier */
/*
 * @Author: Pacific_D
 * @Date: 2022-03-23 18:13:52
 * @LastEditTime: 2022-03-23 21:20:03
 * @LastEditors: Pacific_D
 * @Description: 
 * @FilePath: \class-schedule\src\courses\courses.controller.ts
 */
import { Body, Controller, Post, UseGuards, Headers, Delete, Param } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { UserService } from "src/user/user.service";
import CoursesService from "./courses.service";
import AddCourseDto from "./dto/add-course.dto";


@Controller('/course')
export default class CoursesController {
    private userService: UserService
    private userId: string

    constructor(private readonly coursesService: CoursesService) { 
        this.userService = new UserService(new JwtService({}))
    }

    
    @Post()
    @UseGuards(AuthGuard('jwt'))
    async addCourse(@Body() addCourseDto: AddCourseDto, @Headers() headers: Record<string, string>) {
        //根据请求头的token获取用户信息
        await this.userService.getUserInfo(headers.token).then(res => {
            this.userId = res.id            
        })
        return this.coursesService.addCourse(addCourseDto, this.userId)
    }


    @Delete(':courseId')
    @UseGuards(AuthGuard('jwt'))
    async deleteCourse(@Param('courseId') courseId: string, @Headers() headers: Record<string, string>){
        await this.userService.getUserInfo(headers.token).then(res => {
            this.userId = res.id            
        })
        return this.coursesService.deleteCourse(courseId, this.userId)
    }
}