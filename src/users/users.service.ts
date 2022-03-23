/* eslint-disable prettier/prettier */
/*
 * @Author: PacificD
 * @Date: 2021-10-07 22:36:14
 * @LastEditors: Pacific_D
 * @LastEditTime: 2022-03-23 10:56:25
 * @Description: 
 */
import { Injectable } from '@nestjs/common';
import { statusCodeEnum, Result } from "../config/resultType"
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from './dto/user-login.dto';
import { JwtStrategy } from './jwt.strategy';

@Injectable()
export class UsersService {

  //inject usersRepository
  constructor(
    private readonly jwtService: JwtService,
  ) { }

  async login(userLoginDto: UserLoginDto): Promise<Result> {
    let result: Result
    if (userLoginDto.username === 'Pacific_D' && userLoginDto.password === 'Pacific_D148') {
      //success
      const token = this.jwtService.sign({
        username: userLoginDto.username,
        password: userLoginDto.password
      })

      result = Result.success({
        msg: "login successfully!",
        token: token,
      })
      console.log(userLoginDto);

    } else {
      //password error
      result = Result.fail(statusCodeEnum.BAD_REQUEST, "username or password error")
    }
    return result
  }

  //验证token
  async validate(userLoginDto: UserLoginDto): Promise<Result> {
    let result: Result
    if (userLoginDto.username === 'Pacific_D' && userLoginDto.password === 'Pacific_D148') {
      //success
      const token = this.jwtService.sign({
        username: userLoginDto.username,
        password: userLoginDto.password
      })

      const sf = new JwtStrategy()
      let re = sf.validate(userLoginDto)

      result = Result.success({
        msg: "validate!",
        result: re,
      })
    } else {
      //password error
      result = Result.fail(statusCodeEnum.BAD_REQUEST, "validate error!")
    }
    return result
  }
}
