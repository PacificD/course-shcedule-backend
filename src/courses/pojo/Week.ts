/* eslint-disable prettier/prettier */
/*
 * @Author: Pacific_D
 * @Date: 2022-03-23 18:19:25
 * @LastEditTime: 2022-03-23 21:48:19
 * @LastEditors: Pacific_D
 * @Description: 
 * @FilePath: \class-schedule\src\courses\pojo\Week.ts
 */
import ICoursesData from "../type/coursesData"
import { DateEnum } from "../type/dateEnum"
import Course from "./Course"

export default class Week{
    public readonly week: number
    public readonly userId: string
    public data: Array<ICoursesData>

    constructor(week: number, userId: string, data: Array<ICoursesData>){
        this.week = week
        this.userId = userId
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