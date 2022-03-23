/* eslint-disable prettier/prettier */
/*
 * @Author: PacificD
 * @Date: 2021-10-07 22:36:14
 * @LastEditors: Pacific_D
 * @LastEditTime: 2022-03-23 16:59:11
 * @Description:
 */
import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import UserLoginDto from './dto/user-login.dto';
import UserRegisterDto from './dto/user-register.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('login')
  login(@Body() userLoginDto: UserLoginDto) {
    return this.userService.login(userLoginDto)
  }

  @Post('register')
  register(@Body() userRegisterDto: UserRegisterDto) {
    return this.userService.register(userRegisterDto)
  }
}
