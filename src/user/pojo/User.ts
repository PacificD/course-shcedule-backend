/* eslint-disable prettier/prettier */
/*
 * @Author: Pacific_D
 * @Date: 2022-03-23 12:46:36
 * @LastEditTime: 2022-03-23 12:47:42
 * @LastEditors: Pacific_D
 * @Description: 
 * @FilePath: \class-schedule\src\users\pojo\User.ts
 */
export default class User{
    public readonly id: string
    public username: string
    public password: string

    constructor(id: string, username: string, password: string){
        this.id = id,
        this.username = username
        this.password = password
    }
}
