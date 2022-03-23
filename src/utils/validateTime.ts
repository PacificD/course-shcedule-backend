/* eslint-disable prettier/prettier */
/*
 * @Author: Pacific_D
 * @Date: 2022-03-23 22:16:30
 * @LastEditTime: 2022-03-23 22:18:53
 * @LastEditors: Pacific_D
 * @Description: 
 * @FilePath: \class-schedule\src\utils\validateTime.ts
 */
export default function validateTime(datetime: string): boolean {
    const REGEX = /^(?:19|20)[0-9][0-9]-(?:(?:0[1-9])|(?:1[0-2]))-(?:(?:[0-2][1-9])|(?:[1-3][0-1])) (?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]$/
    if(!REGEX.test(datetime)){
        return false
    }
    return true
}