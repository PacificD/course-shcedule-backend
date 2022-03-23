/* eslint-disable prettier/prettier */
/*
 * @Author: Pacific_D
 * @Date: 2022-03-23 18:14:05
 * @LastEditTime: 2022-03-23 18:16:34
 * @LastEditors: Pacific_D
 * @Description: 
 * @FilePath: \class-schedule\src\courses\courses.service.ts
 */
import { Injectable } from "@nestjs/common";
import { Result, statusCodeEnum } from "src/config/resultType";
import { LowdbService } from "src/lowdb/lowdb.service";
import { v1 as uuidv1 } from 'uuid'

@Injectable()
export default class CoursesService {

    private readonly COLLECTION_NAME = 'weeklyCourses'
    private dbService: LowdbService
    private result: Result

    constructor() {
        this.dbService = new LowdbService(this.COLLECTION_NAME)
    }

}