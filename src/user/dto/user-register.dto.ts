/* eslint-disable prettier/prettier */
/*
 * @Author: Pacific_D
 * @Date: 2022-03-23 12:33:42
 * @LastEditTime: 2022-03-23 12:44:56
 * @LastEditors: Pacific_D
 * @Description: 
 * @FilePath: \class-schedule\src\users\dto\user-register.dto.ts
 */
import { Length, MaxLength, MinLength } from "class-validator";

export default class UserRegisterDto {
    @MinLength(2)
    @MaxLength(16)
    readonly username: string;

    @Length(6, 16)
    readonly password: string;
}
