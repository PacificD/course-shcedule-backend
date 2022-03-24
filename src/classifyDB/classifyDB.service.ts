/* eslint-disable prettier/prettier */
/*
 * @Author: Pacific_D
 * @Date: 2022-03-24 22:13:51
 * @LastEditTime: 2022-03-24 22:13:52
 * @LastEditors: Pacific_D
 * @Description: 
 * @FilePath: \class-schedule\src\lowdb\classifyDB.service.ts
 */
import { Injectable } from "@nestjs/common"
import { LowdbService } from "src/lowdb/lowdb.service"


@Injectable()
export default class ClassifyDBService {
    private readonly COLLECTION_NAME = 'classify'
    public dbService: LowdbService

    constructor() {
        this.dbService = new LowdbService(this.COLLECTION_NAME)
    }
}