/* eslint-disable prettier/prettier */
/*
 * @Author: Pacific_D
 * @Date: 2022-03-23 11:32:45
 * @LastEditTime: 2022-03-23 12:18:13
 * @LastEditors: Pacific_D
 * @Description: 
 * @FilePath: \class-schedule\src\classify\pojo\Classify.ts
 */
export default class Classify{
    public readonly id: string
    public name: string

    constructor(id: string, name: string){
        this.id = id,
        this.name = name
    }
}