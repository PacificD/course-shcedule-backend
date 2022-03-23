/* eslint-disable prettier/prettier */
/*
 * @Author: Pacific_D
 * @Date: 2022-03-23 18:30:07
 * @LastEditTime: 2022-03-23 18:35:05
 * @LastEditors: Pacific_D
 * @Description: 
 * @FilePath: \class-schedule\src\courses\type\coursesData.ts
 */
import Course from "../pojo/Course";
import { DateEnum } from "./dateEnum";

export default interface ICoursesData {
    date: DateEnum
    courses: Array<Course>
}