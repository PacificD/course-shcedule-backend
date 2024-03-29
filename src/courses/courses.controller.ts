/* eslint-disable prettier/prettier */
/*
 * @Author: Pacific_D
 * @Date: 2022-03-23 18:13:52
 * @LastEditTime: 2022-03-25 15:35:11
 * @LastEditors: Pacific_D
 * @Description: 
 * @FilePath: \class-schedule\src\courses\courses.controller.ts
 */
import { Body, Controller, Post, UseGuards, Headers, Delete, Param, Get, Patch } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import CoursesService from "./courses.service";
import AddCourseDto from "./dto/add-course.dto";
import UpdateCourseDto from "./dto/update-course.dto";


@Controller('/course')
export default class CoursesController {
    constructor(
        private readonly coursesService: CoursesService
    ) { }

    @Get(':week')
    @UseGuards(AuthGuard('jwt'))
    async getWeeklyCourses(@Param('week') week: number, @Headers() headers: Record<string, string>) {
        return this.coursesService.getWeeklyCourse(Math.floor(Number(week)), headers)
    }


    @Post()
    @UseGuards(AuthGuard('jwt'))
    async addCourse(@Body() addCourseDto: AddCourseDto, @Headers() headers: Record<string, string>) {
        return this.coursesService.addCourse(addCourseDto, headers)
    }


    @Delete(':courseId')
    @UseGuards(AuthGuard('jwt'))
    async deleteCourse(@Param('courseId') courseId: string, @Headers() headers: Record<string, string>) {
        return this.coursesService.deleteCourse(courseId, headers)
    }

    @Patch()
    @UseGuards(AuthGuard('jwt'))
    async updateCourse(@Body() updateCourseDto: UpdateCourseDto, @Headers() headers: Record<string, string>) {
        return this.coursesService.updateCourse(updateCourseDto, headers)
    }
}