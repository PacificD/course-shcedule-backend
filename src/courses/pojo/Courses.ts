/* eslint-disable prettier/prettier */
/*
 * @Author: Pacific_D
 * @Date: 2022-03-23 18:19:25
 * @LastEditTime: 2022-03-23 18:39:04
 * @LastEditors: Pacific_D
 * @Description: 
 * @FilePath: \class-schedule\src\courses\pojo\Courses.ts
 */
import ICoursesData from "../type/coursesData"
import { DateEnum } from "../type/dateEnum"
import Course from "./Course"

export default class Courses{
    public readonly id: string
    public readonly userId: string
    public readonly week: number
    public data: Array<ICoursesData>

    constructor(id: string, userId: string, week: number, data: Array<ICoursesData>){
        this.id = id
        this.userId = userId
        this.week = week
        this.data = data
    }

    public changeDailyCourses(date: DateEnum, courses: Array<Course>){
        this.data.forEach((dailyCourses: ICoursesData) => {
            if(dailyCourses.date === date){
                dailyCourses.courses = courses
            }
        })
    }
}