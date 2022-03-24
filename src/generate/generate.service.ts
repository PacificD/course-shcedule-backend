/* eslint-disable prettier/prettier */
/*
 * @Author: Pacific_D
 * @Date: 2022-03-24 13:06:10
 * @LastEditTime: 2022-03-24 22:45:27
 * @LastEditors: Pacific_D
 * @Description: 
 * @FilePath: \class-schedule\src\generate\generate.service.ts
 */

import { Injectable } from "@nestjs/common"
import Classify from "src/classify/pojo/Classify"
import ClassifyDBService from "src/classifyDB/classifyDB.service"
import Week from "src/courses/pojo/Week"
import CoursesDBService from "src/coursesDB/coursesDB.service"
import { generateCoursesData } from "src/utils/generateCoursesData"
import generateClassifyTemplate from "./template/generate-classify.template"
import {v1 as uuidv1} from "uuid"

@Injectable()
export default class GenerateService {
    constructor(
        private readonly coursesDBService: CoursesDBService,
        private readonly classifyDBService: ClassifyDBService
    ) {
    }

    async generateWeeks(userId: string): Promise<string> {
        for (let i = 1; i <= 20; i++) {
            const week = new Week(i, userId, generateCoursesData())
            await this.coursesDBService.dbService.addOne<Week>('weeks', week)
        }
        return 'successfully generate!'
    }

    async generateClassify(userId: string): Promise<string>{
        generateClassifyTemplate.forEach(async (template: string) => {
            await this.classifyDBService.dbService.addOne<Classify>('classify', new Classify(uuidv1(), template, userId))
        })
        return 'successfully generate!'
    }
}