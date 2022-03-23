/* eslint-disable prettier/prettier */
/*
 * @Author: Pacific_D
 * @Date: 2022-03-23 10:59:59
 * @LastEditTime: 2022-03-23 11:03:29
 * @LastEditors: Pacific_D
 * @Description: 
 * @FilePath: \class-schedule\src\classify\dto\classify.dto.ts
 */
import { IsNotEmpty, IsString } from "class-validator";


export default class ClassifyDto {
    @IsNotEmpty()
    @IsString()
    course: string
}