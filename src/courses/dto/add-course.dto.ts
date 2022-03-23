/* eslint-disable prettier/prettier */
/*
 * @Author: Pacific_D
 * @Date: 2022-03-23 21:11:24
 * @LastEditTime: 2022-03-23 22:27:10
 * @LastEditors: Pacific_D
 * @Description: 
 * @FilePath: \class-schedule\src\courses\dto\add-course.dto.ts
 */
import { IsNotEmpty, IsNumberString, IsString } from "class-validator";

export default class AddCourseDto{
    //第几周，传数字1~20
    @IsNotEmpty()
    @IsNumberString()
    week: number

    //星期几，传数字 1~7
    @IsNotEmpty()
    @IsNumberString()
    date: number

    @IsNotEmpty()
    @IsString()
    classifyId: string

    @IsNotEmpty()
    @IsString()
    startTime: string

    @IsNotEmpty()
    @IsString()
    endTime: string

    @IsNotEmpty()
    @IsString()
    location: string
}