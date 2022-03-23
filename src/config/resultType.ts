/* eslint-disable prettier/prettier */
/*
 * @Author: Pacific_D
 * @Date: 2022-03-17 17:41:09
 * @LastEditTime: 2022-03-23 10:56:15
 * @LastEditors: Pacific_D
 * @Description: 
 * @FilePath: \class-schedule\src\config\resultType.ts
 */
export enum statusCodeEnum {
    OK = 200,
    UNEXPECT = 400, //未知错误
    NEED_AUTH = 401, //需要登录
    NO_FIND = 404, //找不到相关资源
    BAD_REQUEST = 403, //请求错误
    EXISTED = 408, //字段已存在
    SEVER_ERR = 500, //服务器错误
}

export class Result {
    constructor(private statusCode: statusCodeEnum,
        private data: any,
        private message: string) { }

    public static success(data: any) {
        return new Result(200, data, "success");
    }

    public static fail(statusCode: statusCodeEnum, message: string) {
        return new Result(statusCode, '', message);
    }
}