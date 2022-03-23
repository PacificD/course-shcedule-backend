/* eslint-disable prettier/prettier */
/*
 * @Author: Pacific_D
 * @Date: 2022-03-17 17:41:09
 * @LastEditTime: 2022-03-23 14:45:44
 * @LastEditors: Pacific_D
 * @Description: 
 * @FilePath: \class-schedule\src\config\resultType.ts
 */
export enum statusCodeEnum {
    OK = 200,
    CREATED = 201, //创建成功
    BAD_REQUEST = 400, //客户端请求的语法错误，服务器无法理解
    UNAUTHORIZED = 401, //请求要求用户的身份认证
    FORBIDDEN = 403, //服务器理解请求客户端的请求，但是拒绝执行此请求
    NOT_FOUND = 404, //找不到相关资源
    REQUEST_TIME_OUT = 408, //超时
    INTERNAL_SERVER_ERROR = 500, //服务器错误
}

export class Result {
    constructor(private statusCode: statusCodeEnum,
        private data: any,
        private message: string) { }

    public static success(data: any) {
        return new Result(statusCodeEnum.OK, data, "success");
    }

    public static fail(statusCode: statusCodeEnum, message: string) {
        return new Result(statusCode, '', message);
    }
}