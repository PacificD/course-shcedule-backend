/* eslint-disable prettier/prettier */
/*
 * @Author: Pacific_D
 * @Date: 2022-03-23 11:32:45
 * @LastEditTime: 2022-03-23 15:23:49
 * @LastEditors: Pacific_D
 * @Description: 
 * @FilePath: \class-schedule\src\classify\pojo\Classify.ts
 */
export default class Classify{
    public readonly id: string
    public course: string
    public userId: string 

    constructor(id: string, course: string, userId: string){
        this.id = id,
        this.course = course
        this.userId = userId
    }
}