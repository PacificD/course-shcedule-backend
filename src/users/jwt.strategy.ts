/* eslint-disable prettier/prettier */
/*
 * @Author: PacificD
 * @Date: 2021-10-09 19:53:04
 * @LastEditors: PacificD
 * @LastEditTime: 2021-11-23 23:13:29
 * @Description: 
 */
/*
 * @Author: PacificD
 * @Date: 2021-10-09 19:53:04
 * @LastEditors: PacificD
 * @LastEditTime: 2021-10-09 20:19:06
 * @Description:
 */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../config/jwtConstants';
import { UserLoginDto } from './dto/user-login.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromHeader('token'),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: UserLoginDto) {
        return { username: payload.username, password: payload.password };
    }
}