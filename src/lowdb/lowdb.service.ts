/* eslint-disable prettier/prettier */
/*
 * @Author: Pacific_D
 * @Date: 2022-03-17 13:42:56
 * @LastEditTime: 2022-03-24 11:27:34
 * @LastEditors: Pacific_D
 * @Description: 
 * @FilePath: \class-schedule\src\lowdb\lowdb.service.ts
 */
import { Injectable} from '@nestjs/common';
import * as lowdb from 'lowdb';
import * as FileAsync from 'lowdb/adapters/FileAsync';


@Injectable()
export class LowdbService {
    private db: lowdb.LowdbAsync<any>;

    constructor(collectionName) {
        this.initDatabase(collectionName)
    }


    /**
     * @description: 初始化数据库
     * @param {string} collctionName
     * @return {*}
     */
    private async initDatabase(collctionName: string): Promise<void> {
        const adapter = new FileAsync(`${collctionName}.json`);
        this.db = await lowdb(adapter);
        const listUsers = await this.db.get(collctionName).value();
        if (!listUsers) {
            await this.db.set(collctionName, []).write();
        }
    }


    /**
     * @description: 覆盖数据
     * @param {string} collctionName
     * @param {object} obj
     * @return {*}
     */    
    async setData(collctionName: string, obj: object): Promise<boolean> {
        await this.db.set(collctionName, obj).write()
        return true
    }


    /**
     * @description: 添加一条数据
     * @param {string} collctionName
     * @param {oneType} obj
     * @return {oneType} obj
     */
    async addOne<oneType>(collctionName: string, obj: oneType): Promise<oneType> {
        const listData = await this.db.get(collctionName).value()
        listData.push(obj)
        await this.db.set(collctionName, listData).write()
        return obj
    }


    /**
     * @description: 删除数据，根据选项删除一条或多条数据
     * @param {string} collctionName
     * @param {object} option 单个或多个key-value组合的对象
     * @return {object} affectedNum
     */
    async delByOption(collctionName: string, option: object): Promise<object> {
        const listData = await this.db.get(collctionName).value()
        let affectedNum = 0
        const copyListData = []
        listData.forEach(data => {
            if (data) {
                let isDataShouldKeep = false
                for (const key in option) {
                    if (key && data[key] !== option[key]) {
                        isDataShouldKeep = true
                    }
                }
                if (isDataShouldKeep) {
                    copyListData.push(data)
                } else {
                    affectedNum++
                }
            }
        })
        await this.db.set(collctionName, copyListData).write()
        return { affectedNum: affectedNum }
    }


    /**
     * @description: 更新数据，根据选项更新一条或多条数据
     * @param {string} collctionName
     * @param {object} selectOption 单个或多个key-value组合的对象
     * @param {object} newValue 更新值
     * @return {object} affectedNum
     */
    async update(collctionName: string, selectOption: object, newValue: object): Promise<object> {
        let listData = await this.db.get(collctionName).value(),
            affectedNum = 0
        listData = listData.map(data => {
            if (data) {
                for (const key in selectOption) {
                    if (key && data[key] === selectOption[key]) {
                        affectedNum++
                        data = Object.assign(data, newValue)
                    }
                }
            }
            return data
        })
        await this.db.set(collctionName, listData).write()
        return { affectedNum: affectedNum }
    }


    /**
     * @description: 获取所有数据
     * @param {string} collctionName
     * @return {*} listData
     */
    async getAll(collctionName: string): Promise<any> {
        const listData = await this.db.get(collctionName).value()
        return listData
    }


    /** 
     * @description: 根据条件搜索数据
     * @param {string} collctionName
     * @param {object} option
     * @return {*} listData
     */
    async getByOption(collctionName: string, option: object): Promise<any> {
        const listData = await this.db.get(collctionName).find(option).value()
        if (!listData) return []
        return listData
    }
}