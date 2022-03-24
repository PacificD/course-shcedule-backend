/* eslint-disable prettier/prettier */
/*
 * @Author: Pacific_D
 * @Date: 2022-03-24 13:14:10
 * @LastEditTime: 2022-03-24 13:18:18
 * @LastEditors: Pacific_D
 * @Description: 
 * @FilePath: \class-schedule\src\coursesDB\coursesDB.service.ts
 */
import { Injectable } from "@nestjs/common"
import { LowdbService } from "src/lowdb/lowdb.service"


@Injectable()
export default class CoursesDBService {
    private readonly COLLECTION_NAME = 'weeks'
    public dbService: LowdbService

    constructor() {
        this.dbService = new LowdbService(this.COLLECTION_NAME)
    }
}