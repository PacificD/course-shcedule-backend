/* eslint-disable prettier/prettier */
/*
 * @Author: PacificD
 * @Date: 2021-10-07 22:36:14
 * @LastEditors: Pacific_D
 * @LastEditTime: 2022-03-23 21:28:18
 * @Description: 
 */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/config/jwtConstants';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: {
      expiresIn: '1d' //token expires time
    }
  })],
  controllers: [UserController],
  providers: [UserService, JwtStrategy, ]
})
export class UserModule { }
