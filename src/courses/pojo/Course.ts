/* eslint-disable prettier/prettier */
/*
 * @Author: Pacific_D
 * @Date: 2022-03-23 18:23:22
 * @LastEditTime: 2022-03-23 18:27:54
 * @LastEditors: Pacific_D
 * @Description: 
 * @FilePath: \class-schedule\src\courses\pojo\Course.ts
 */
export default class Course{
    public readonly id: string
    public course: string
    public classifyId: string
    public startTime: string
    public endTime: string
    public location: string

    constructor(id: string, course: string, classifyId: string, startTime: string, endTime: string, location: string){
        this.id = id
        this.course = course
        this.classifyId = classifyId
        this.startTime = startTime
        this.endTime = endTime
        this.location = location
    }


    public update(course: string, classifyId: string, startTime: string, endTime: string, location: string){
        this.course = course
        this.classifyId = classifyId
        this.startTime = startTime
        this.endTime = endTime
        this.location = location
    }
}