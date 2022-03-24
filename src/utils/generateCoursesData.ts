/* eslint-disable prettier/prettier */
/*
 * @Author: Pacific_D
 * @Date: 2022-03-23 21:34:56
 * @LastEditTime: 2022-03-24 21:45:31
 * @LastEditors: Pacific_D
 * @Description: 
 * @FilePath: \class-schedule\src\utils\generateCoursesData.ts
 */

import ICoursesData from "src/courses/type/coursesData";
import { DateEnum } from "src/courses/type/dateEnum";

export const numberDateMapper = new Map<number| string, string | number>([
    [1, DateEnum.MON],
    [2, DateEnum.TUES],
    [3, DateEnum.WEDNES],
    [4, DateEnum.THURS],
    [5, DateEnum.FRI],
    [6, DateEnum.SATUR],
    [7, DateEnum.SUN],
    [DateEnum.MON, 1],
    [DateEnum.TUES, 2],
    [DateEnum.WEDNES, 3],
    [DateEnum.THURS, 4],
    [DateEnum.FRI, 5],
    [DateEnum.SATUR, 6],
    [DateEnum.SUN, 7],
])

export function generateCoursesData(): Array<ICoursesData> {
    const coursesDate: Array<ICoursesData> = []
    for (let i = 1; i <= 7; i++) {
        coursesDate.push({
            date: numberDateMapper.get(i) as DateEnum,
            courses: []
        })
    }
    return coursesDate
}
