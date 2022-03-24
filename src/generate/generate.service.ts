/* eslint-disable prettier/prettier */
/*
 * @Author: Pacific_D
 * @Date: 2022-03-24 13:06:10
 * @LastEditTime: 2022-03-24 13:18:24
 * @LastEditors: Pacific_D
 * @Description: 
 * @FilePath: \class-schedule\src\generate\generate.service.ts
 */

import { Injectable } from "@nestjs/common"
import Week from "src/courses/pojo/Week"
import CoursesDBService from "src/coursesDB/coursesDB.service"
import { LowdbService } from "src/lowdb/lowdb.service"
import { generateCoursesData } from "src/utils/generateCoursesData"

@Injectable()
export default class GenerateService {
    private readonly COLLECTION_NAME = 'weeks'

    constructor(private readonly coursesDBService: CoursesDBService) {
    }

    async generateWeeks(userId: string): Promise<string> {
        for (let i = 1; i <= 20; i++) {
            const week = new Week(i, userId, generateCoursesData())
            await this.coursesDBService.dbService.addOne<Week>(this.COLLECTION_NAME, week)
        }
        return 'successfully generate!'
    }
}