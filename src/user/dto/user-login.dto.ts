/* eslint-disable prettier/prettier */
/*
 * @Author: PacificD
 * @Date: 2021-10-07 22:36:14
 * @LastEditors: Pacific_D
 * @LastEditTime: 2022-03-23 12:41:36
 * @Description: 
 */
import { Length, MaxLength, MinLength } from "class-validator";

export default class UserLoginDto {
    @MinLength(2)
    @MaxLength(16)
    readonly username: string;

    @Length(6, 16)
    readonly password: string;
}
