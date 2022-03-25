/* eslint-disable prettier/prettier */
/*
 * @Author: Pacific_D
 * @Date: 2022-03-24 13:06:10
 * @LastEditTime: 2022-03-25 20:39:15
 * @LastEditors: Pacific_D
 * @Description: 
 * @FilePath: \class-schedule\src\generate\generate.service.ts
 */

import { Injectable } from "@nestjs/common"
import Classify from "src/classify/pojo/Classify"
import ClassifyDBService from "src/classifyDB/classifyDB.service"
import Week from "src/courses/pojo/Week"
import CoursesDBService from "src/coursesDB/coursesDB.service"
import generateClassifyTemplate from "./template/generate-classify.template"
import { v1 as uuidv1 } from "uuid"
import Course from "src/courses/pojo/Course"
import duringTime from "./template/duringTime.template"
import { numberDateMapper } from "src/utils/generateCoursesData"
import ICoursesData from "src/courses/type/coursesData"
import { DateEnum } from "src/courses/type/dateEnum"
import ITime from "./type/ITime"

@Injectable()
export default class GenerateService {
    constructor(
        private readonly coursesDBService: CoursesDBService,
        private readonly classifyDBService: ClassifyDBService,
    ) {
    }

    async generate(userId: string): Promise<string> {
        const classifyTemplate: Array<string> = Array.from(generateClassifyTemplate.keys()),
            classifyTemplateLength = classifyTemplate.length
        //初始化课程分类
        await classifyTemplate.forEach(async (classify: string) => {
            await this.classifyDBService.dbService.addOne<Classify>('classify', {
                id: uuidv1(),
                course: classify,
                userId: userId
            })
        })
        //初始化课程表：20周
        for (let i = 1; i <= 20; i++) {
            const data: Array<ICoursesData> = []
            //7天
            for (let i = 1; i <= 7; i++) {
                const date = numberDateMapper.get(i) as DateEnum,
                    courses: Array<Course> = []
                //初始化一天, 若为周末则大概率没课
                const coursesNum = (date === 'Saturday' || date === 'Sunday') ?
                    [0, 0, 0, 0, 1][Math.round(Math.random() * 4)]
                    : [0,1,2,2,3,3,4,5][Math.round(Math.random() * 7)]
                //初始化每节课的持续时间
                    const timeList: Array<ITime> = []
                for(let i = 0; i < coursesNum; i++){
                    let time = duringTime[Math.round(Math.random() * 4)]
                    while(true){
                        if(timeList.every((atime: ITime) => atime.startTime !== time.startTime)){
                            timeList.push(time)
                            break
                        }else{
                            time = duringTime[Math.round(Math.random() * 4)]
                        }
                    }
                }
                timeList.sort((time1: ITime, time2) => {
                    if(time1.startTime > time2.startTime){
                        return 1
                    }else{
                        return -1
                    }
                })
                for (let i = 0; i < coursesNum; i++) {
                    //从template中随机取课名，获取classifyId，生成course
                    let templateIndex = Math.round(Math.random() * classifyTemplateLength)
                    templateIndex === classifyTemplateLength && templateIndex--
                    const classifyName = classifyTemplate[templateIndex]
                    let classifyId = ''
                    await this.classifyDBService.dbService.getByOption('classify', {
                        course: classifyName,
                        userId: userId
                    }).then(res => {
                        if (res.id) classifyId = res.id
                    })
                    const course: Course = new Course(uuidv1(), classifyName, classifyId, timeList[i].startTime, timeList[i].endTime, generateClassifyTemplate.get(classifyName))
                    courses.push(course)
                }
                data.push({
                    date: date,
                    courses: courses
                })
            }
            const week = new Week(i, userId, data)
            await this.coursesDBService.dbService.addOne<Week>('weeks', week)
        }
        return 'successfully generate!'
    }
}