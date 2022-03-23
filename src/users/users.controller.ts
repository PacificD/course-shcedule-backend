/* eslint-disable prettier/prettier */
/*
 * @Author: PacificD
 * @Date: 2021-10-07 22:36:14
 * @LastEditors: PacificD
 * @LastEditTime: 2021-11-26 15:05:32
 * @Description:
 */
import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserLoginDto } from './dto/user-login.dto';

@ApiTags('用户')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('login')
  @ApiOperation({
    summary: '登录：获得token',
  })
  login(@Body() userLoginDto: UserLoginDto) {
    return this.usersService.login(userLoginDto)
  }
}
