import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/user/schema/user.schema';
import { USER_EMAIL_NOT_FOUND_ERROR, USER_WRONG_PASSWORD_ERROR } from './constants/auth.constants';
import { AuthLoginDto } from './dto/auth-login.dto';
import { compare } from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import * as ms from 'ms'


@Injectable()
export class AuthService {
    constructor(@InjectModel('User') private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService) { }

    async userValidation(authLoginDto: AuthLoginDto){
        const candidate = await this.userModel.findOne({email: authLoginDto.email})
        if(!candidate){
            throw new UnauthorizedException(USER_EMAIL_NOT_FOUND_ERROR)
        }
        const validPassword = await compare(authLoginDto.password, candidate.passwordHash)
        if(!validPassword){
            throw new UnauthorizedException(USER_WRONG_PASSWORD_ERROR)
        }
        return { email: candidate.email }
    }

    async login({email}){
        const payload = { email }
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }
}
