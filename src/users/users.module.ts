/* eslint-disable prettier/prettier */
/*
 * @Author: PacificD
 * @Date: 2021-10-07 22:36:14
 * @LastEditors: Pacific_D
 * @LastEditTime: 2022-03-23 10:54:31
 * @Description: 
 */
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
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
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy]
})
export class UsersModule { }
