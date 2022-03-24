/* eslint-disable prettier/prettier */
/*
 * @Author: Pacific_D
 * @Date: 2022-03-23 11:05:09
 * @LastEditTime: 2022-03-24 12:42:25
 * @LastEditors: Pacific_D
 * @Description: 
 * @FilePath: \class-schedule\src\classify\classify.service.ts
 */

import { Injectable } from "@nestjs/common";
import { Result, statusCodeEnum } from "src/config/resultType";
import { LowdbService } from "src/lowdb/lowdb.service";
import ClassifyDto from "./dto/classify.dto";
import { v1 as uuidv1 } from 'uuid'
import Classify from "./pojo/Classify";
import { UserService } from "src/user/user.service";

@Injectable()
export default class ClassifyService {

    private readonly COLLECTION_NAME = 'classify'
    private dbService: LowdbService
    private result: Result

    constructor(private readonly userService: UserService) {
        this.dbService = new LowdbService(this.COLLECTION_NAME)
    }


    private async getUserIdByToken(headers: Record<string, string>): Promise<string> {
        let userId: string
        //根据请求头的token获取用户信息
        await this.userService.getUserInfo(headers.token).then(res => {
            userId = res.id
        })
        return userId
    }

    async checkClassify(classifyId: string, headers: Record<string, string>): Promise<string> {
        let checkResult = ''
        const userId = await this.getUserIdByToken(headers)
        await this.dbService.getByOption(this.COLLECTION_NAME, { id: classifyId }).then(res => {
            if (res.id && userId === res.userId) {
                checkResult = res.course
            }
        })
        return checkResult
    }


    async addClassify(classifyDto: ClassifyDto, headers: Record<string, string>): Promise<Result> {
        const userId = await this.getUserIdByToken(headers)
        const classify = new Classify(uuidv1(), classifyDto.course, userId)
        let isClassifyExisted = false

        //check classify-name
        await this.dbService.getAll(this.COLLECTION_NAME).then(listData => {
            listData.forEach(data => {
                if (data.course === classifyDto.course && data.userId === userId) {
                    isClassifyExisted = true
                }
            })
        })

        if (isClassifyExisted) {
            this.result = Result.fail(statusCodeEnum.BAD_REQUEST, "该课程分类已存在!")
        } else {
            await this.dbService.addOne<Classify>(this.COLLECTION_NAME, classify).then(res => {
                this.result = Result.success(res)
            })
        }

        return this.result
    }


    async deleteClassify(classifyId: string, headers: Record<string, string>) {
        const userId = await this.getUserIdByToken(headers)
        const searchRes = await this.dbService.getByOption(this.COLLECTION_NAME, {
            id: classifyId
        })

        if (searchRes.id) {
            //判断要删除的课程分类所属的用户是不是本人
            if (searchRes.userId !== userId) {
                this.result = Result.fail(statusCodeEnum.BAD_REQUEST, "非法操作!")
            } else {
                await this.dbService.delByOption(this.COLLECTION_NAME, {
                    id: classifyId
                }).then(res => {
                    this.result = Result.success('删除成功')
                })
            }
        } else {
            this.result = Result.fail(statusCodeEnum.BAD_REQUEST, "该课程不存在!")
        }

        return this.result
    }


    async getClassify(headers: Record<string, string>): Promise<Result> {
        const userId = await this.getUserIdByToken(headers)
        const listData = await this.dbService.getAll(this.COLLECTION_NAME),
            resData: Array<Classify> = []
        listData.forEach((data: Classify) => {
            if (data.userId === userId) resData.push(data)
        })
        this.result = Result.success(resData)
        return this.result
    }
}