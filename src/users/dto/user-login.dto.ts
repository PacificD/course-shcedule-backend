/* eslint-disable prettier/prettier */
/*
 * @Author: PacificD
 * @Date: 2021-10-07 22:36:14
 * @LastEditors: PacificD
 * @LastEditTime: 2021-11-23 23:11:52
 * @Description: 
 */
import { ApiProperty } from "@nestjs/swagger";
import { Length, MaxLength, MinLength } from "class-validator";

export class UserLoginDto {
    @ApiProperty()
    @MinLength(2)
    @MaxLength(16)
    readonly username: string;

    @ApiProperty()
    @Length(6, 16)
    readonly password: string;
}
