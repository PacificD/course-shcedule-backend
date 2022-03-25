/* eslint-disable prettier/prettier */
/*
 * @Author: Pacific_D
 * @Date: 2022-03-25 15:24:38
 * @LastEditTime: 2022-03-25 15:25:49
 * @LastEditors: Pacific_D
 * @Description: 
 * @FilePath: \class-schedule\src\courses\dto\update-course.dto.ts
 */
import { IsNotEmpty, IsNumberString, IsString } from "class-validator";

export default class UpdateCourseDto{
    @IsNotEmpty()
    @IsString()
    id: string

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