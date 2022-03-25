/* eslint-disable prettier/prettier */
/*
 * @Author: Pacific_D
 * @Date: 2022-03-23 18:14:05
 * @LastEditTime: 2022-03-25 15:43:05
 * @LastEditors: Pacific_D
 * @Description: 
 * @FilePath: \class-schedule\src\courses\courses.service.ts
 */
import { Injectable, } from "@nestjs/common";
import ClassifyService from "src/classify/classify.service";
import { Result, statusCodeEnum } from "src/config/resultType";
import CoursesDBService from "src/coursesDB/coursesDB.service";
import { UserService } from "src/user/user.service";
import { numberDateMapper } from "src/utils/generateCoursesData";
import validateTime from "src/utils/validateTime";
import { v1 as uuidv1 } from 'uuid'
import AddCourseDto from "./dto/add-course.dto";
import UpdateCourseDto from "./dto/update-course.dto";
import Course from "./pojo/Course";
import Week from "./pojo/Week";
import ICoursesData from "./type/coursesData";

@Injectable()
export default class CoursesService {

    private readonly COLLECTION_NAME = 'weeks'
    private result: Result

    constructor(
        private readonly coursesDBService: CoursesDBService,
        private readonly classifyService: ClassifyService,
        private readonly userService: UserService
    ) { }


    private async getUserIdByToken(headers: Record<string, string>): Promise<string> {
        let userId: string
        //根据请求头的token获取用户信息
        await this.userService.getUserInfo(headers.token).then(res => {
            userId = res.id
        })
        return userId
    }


    async getWeeklyCourse(week: number, headers: Record<string, string>): Promise<Result> {
        const userId = await this.getUserIdByToken(headers)
        //判断数字week和date是否越界
        if (week > 20 || week < 1) {
            this.result = Result.fail(statusCodeEnum.BAD_REQUEST, "week必须在1~20之间!")
            return this.result
        }

        const ListData = await this.coursesDBService.dbService.getByOption(this.COLLECTION_NAME, {
            week: week,
            userId: userId
        })

        this.result = Result.success(ListData)
        return this.result
    }


    async addCourse(addCourseDto: AddCourseDto, headers: Record<string, string>): Promise<Result> {
        const userId = await this.getUserIdByToken(headers)
        const week = Math.floor(Number(addCourseDto.week)),
            date = Math.floor(Number(addCourseDto.date)),
            { classifyId, startTime, endTime, location } = addCourseDto
        let isClassifyExisted = false,
            courseName: string

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
        if (!validateTime(startTime) || !validateTime(endTime)) {
            this.result = Result.fail(statusCodeEnum.BAD_REQUEST, "时间格式不正确！请传入正确的时间格式，如：2020-04-10 09:30")
            return this.result
        }

        //验证课程是否存在
        await this.classifyService.checkClassify(classifyId, headers).then(res => {
            if (res !== '') {
                isClassifyExisted = true
                courseName = res
            }
        })
        if (!isClassifyExisted) {
            this.result = Result.fail(statusCodeEnum.BAD_REQUEST, "该课程类别不存在!")
            return this.result
        }

        //获取那一周的数据
        const weekData = await this.coursesDBService.dbService.getByOption(this.COLLECTION_NAME, {
            week: week,
            userId: userId
        })

        weekData.data.forEach((data: ICoursesData) => {
            if (data.date === numberDateMapper.get(Number(addCourseDto.date))) {
                data.courses.push(new Course(uuidv1(), courseName, classifyId, startTime, endTime, location))
            }
        })

        //写入
        const listData = await this.coursesDBService.dbService.getAll(this.COLLECTION_NAME)
        listData.forEach((list: Week) => {
            if (list.week === week && list.userId === userId) {
                list = weekData
            }
        })
        await this.coursesDBService.dbService.setData(this.COLLECTION_NAME, listData).then(res => {
            res && (this.result = Result.success('添加成功!'))
        })

        return this.result
    }


    async deleteCourse(courseId: string, headers: Record<string, string>): Promise<Result> {
        const userId = await this.getUserIdByToken(headers)
        const week: Week = await this.coursesDBService.dbService.getByOption(this.COLLECTION_NAME, {
            data: [{ courses: [{ id: courseId }] }]
        })

        let newcourses: Array<Course>,
            indexOfDeletedDate: number
        //判断课程是否存在
        if (!week || !week.data) {
            this.result = Result.fail(statusCodeEnum.BAD_REQUEST, "该课程不存在!")
            return this.result
        }
        week.data.forEach((courseData: ICoursesData) => {
            for (const course of courseData.courses) {
                if (course.id === courseId) {
                    indexOfDeletedDate = Number(numberDateMapper.get(courseData.date)) - 1
                    newcourses = courseData.courses.filter((course: Course) => { if (course.id !== courseId) return course })
                    break
                }
            }
        })
        week.data[indexOfDeletedDate].courses = newcourses
        this.result = Result.fail(statusCodeEnum.INTERNAL_SERVER_ERROR, '删除失败!')
        let weeks = await this.coursesDBService.dbService.getAll(this.COLLECTION_NAME)
        weeks = weeks.map((oldWeek: Week) => {
            if (oldWeek.week === week.week && oldWeek.userId === userId) {
                return week
            }
            return oldWeek
        })
        await this.coursesDBService.dbService.setData(this.COLLECTION_NAME, weeks).then(res => {
            res && (this.result = Result.success('删除成功!'))
        })

        return this.result
    }


    async updateCourse(updateCourseDto: UpdateCourseDto, headers: Record<string, string>): Promise<Result> {
        const userId = await this.getUserIdByToken(headers),
            { id, classifyId, startTime, endTime, location } = updateCourseDto
        let courseName: string,
            isClassifyExisted = false,
            indexOfUpateDate: number

        //验证时间格式
        if (!validateTime(startTime) || !validateTime(endTime)) {
            this.result = Result.fail(statusCodeEnum.BAD_REQUEST, "时间格式不正确！请传入正确的时间格式，如：2020-04-10 09:30")
            return this.result
        }

        //验证课程是否存在
        await this.classifyService.checkClassify(classifyId, headers).then(res => {
            if (res !== '') {
                isClassifyExisted = true
                courseName = res
            }
        })
        if (!isClassifyExisted) {
            this.result = Result.fail(statusCodeEnum.BAD_REQUEST, "该课程类别不存在!")
            return this.result
        }

        const week: Week = await this.coursesDBService.dbService.getByOption(this.COLLECTION_NAME, {
            data: [{ courses: [{ id: id }] }]
        })

        //判断课程是否存在
        if (!week || !week.data) {
            this.result = Result.fail(statusCodeEnum.BAD_REQUEST, "该课程不存在!")
            return this.result
        }

        week.data.forEach((courseData: ICoursesData) => {
            for (const course of courseData.courses) {
                if (course.id === id) {
                    indexOfUpateDate = Number(numberDateMapper.get(courseData.date)) - 1
                    course.classifyId = classifyId
                    course.course = courseName
                    course.startTime = startTime
                    course.endTime = endTime
                    course.location = location
                    break
                }
            }
        })

        this.result = Result.fail(statusCodeEnum.INTERNAL_SERVER_ERROR, '更新失败!')
        let weeks = await this.coursesDBService.dbService.getAll(this.COLLECTION_NAME)
        weeks = weeks.map((oldWeek: Week) => {
            if (oldWeek.week === week.week && oldWeek.userId === userId) {
                return week
            }
            return oldWeek
        })
        await this.coursesDBService.dbService.setData(this.COLLECTION_NAME, weeks).then(res => {
            res && (this.result = Result.success('更新成功!'))
        })

        return this.result
    }
}