/* eslint-disable prettier/prettier */
/*
 * @Author: Pacific_D
 * @Date: 2022-03-23 18:13:52
 * @LastEditTime: 2022-03-23 18:17:03
 * @LastEditors: Pacific_D
 * @Description: 
 * @FilePath: \class-schedule\src\courses\courses.controller.ts
 */
import { Body, Controller, Post, UseGuards, Headers, Delete, Param } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { UserService } from "src/user/user.service";
import CoursesService from "./courses.service";


@Controller('/classify')
export default class CoursesController {
    private userService: UserService
    private userId: string

    constructor(private readonly coursesService: CoursesService) { 
        this.userService = new UserService(new JwtService({}))
    }

}