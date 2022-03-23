/* eslint-disable prettier/prettier */
/*
 * @Author: Pacific_D
 * @Date: 2022-03-23 15:05:16
 * @LastEditTime: 2022-03-23 15:11:32
 * @LastEditors: Pacific_D
 * @Description: 
 * @FilePath: \class-schedule\src\users\vo\UserVo.ts
 */
export default class UserVo{
    private id: string
    private username: string
    private token: string

    constructor(id: string, username: string, token: string){
        this.id = id
        this.username = username
        this.token = token
    }
}