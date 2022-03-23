/* eslint-disable prettier/prettier */
/*
 * @Author: Pacific_D
 * @Date: 2022-03-23 18:14:05
 * @LastEditTime: 2022-03-23 23:06:47
 * @LastEditors: Pacific_D
 * @Description: 
 * @FilePath: \class-schedule\src\courses\courses.service.ts
 */
import { Injectable, Res } from "@nestjs/common";
import ClassifyService from "src/classify/classify.service";
import { Result, statusCodeEnum } from "src/config/resultType";
import { LowdbService } from "src/lowdb/lowdb.service";
import { generateCoursesData } from "src/utils/generateCoursesData";
import validateTime from "src/utils/validateTime";
import { v1 as uuidv1 } from 'uuid'
import AddCourseDto from "./dto/add-course.dto";
import Week from "./pojo/Week";

@Injectable()
export default class CoursesService {

    private readonly COLLECTION_NAME = 'weeks'
    private dbService: LowdbService
    private classifyService: ClassifyService
    private result: Result

    constructor() {
        this.dbService = new LowdbService(this.COLLECTION_NAME)
        this.classifyService = new ClassifyService()
    }


    async generateWeeks(userId: string): Promise<string> {
        for (let i = 1; i <= 20; i++) {
            const week = new Week(i, userId, generateCoursesData())
            await this.dbService.addOne<Week>(this.COLLECTION_NAME, week)
        }
        return 'successfully generate!'
    }


    async addCourse(addCourseDto: AddCourseDto, userId: string): Promise<Result> {

        const week = Math.floor(Number(addCourseDto.week)),
            date = Math.floor(Number(addCourseDto.date))
        let isClassifyExisted = false

        //判断数字week和date是否越界
        if (week > 20 || week < 1) {
            this.result = Result.fail(statusCodeEnum.BAD_REQUEST, "week必须在1~20之间!")
            return this.result
        }
        if (date > 7 || date < 1) {
            this.result = Result.fail(statusCodeEnum.BAD_REQUEST, "date必须在1~7之间!")
            return this.result
        }

        //验证时间格式
        if (!validateTime(addCourseDto.startTime) || !validateTime(addCourseDto.endTime)) {
            this.result = Result.fail(statusCodeEnum.BAD_REQUEST, "时间格式不正确！请传入正确的时间格式，如：2020-04-10 09:30")
            return this.result
        }

        //验证课程是否存在
        await this.classifyService.checkClassify(addCourseDto.classifyId, userId).then(res => {
            if (res) {
                isClassifyExisted = true
            }
        })
        if (!isClassifyExisted) {
            this.result = Result.fail(statusCodeEnum.BAD_REQUEST, "该课程类别不存在!")
            return this.result
        }

        //获取那一周的数据
        const weekData = await this.dbService.getByOption(this.COLLECTION_NAME,{
            week: Number(addCourseDto.week),
            userId: userId
        })        
        console.log(weekData);
        //TODO: 通过mapper和数组筛选找到 date 的那个对象，push course

        this.result = Result.success('haha')
        return this.result
    }


    async deleteCourse(courseId: string, userId: string) {
        return 'HAHA'
    }
}