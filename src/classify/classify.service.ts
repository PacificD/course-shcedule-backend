/* eslint-disable prettier/prettier */
/*
 * @Author: Pacific_D
 * @Date: 2022-03-23 11:05:09
 * @LastEditTime: 2022-03-23 12:18:38
 * @LastEditors: Pacific_D
 * @Description: 
 * @FilePath: \class-schedule\src\classify\classify.service.ts
 */

import { Injectable } from "@nestjs/common";
import { Result } from "src/config/resultType";
import { LowdbService } from "src/lowdb/lowdb.service";
import ClassifyDto from "./dto/classify.dto";
import { v1 as uuidv1 } from 'uuid'
import Classify from "./pojo/Classify";

const collectionName = 'classify'

@Injectable()
export default class ClassifyService {
    dbService: LowdbService

    constructor() {
        this.dbService = new LowdbService(collectionName)
    }

    async addClassify(classifyDto: ClassifyDto): Promise<Result> {
        let result: Result
        const classify = new Classify(uuidv1(), classifyDto.course)
        await this.dbService.addOne<Classify>(collectionName, classify).then(res => {
            result = Result.success(res)
        })
        return result
    }
}