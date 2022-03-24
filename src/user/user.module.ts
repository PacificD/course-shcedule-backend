/* eslint-disable prettier/prettier */
/*
 * @Author: PacificD
 * @Date: 2021-10-07 22:36:14
 * @LastEditors: Pacific_D
 * @LastEditTime: 2022-03-24 13:07:35
 * @Description: 
 */
import { Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/config/jwtConstants';
import { JwtStrategy } from './jwt.strategy';
import { GenerateModule } from 'src/generate/generate.module';

@Global()
@Module({
  imports: [JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: {
      expiresIn: '1d' //token expires time
    }
  }),GenerateModule],
  controllers: [UserController],
  providers: [UserService, JwtStrategy,],
  exports: [UserService]
})
export class UserModule { }
