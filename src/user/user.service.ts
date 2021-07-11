import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { UserCreateDto } from './dto/user-create.dto';
import { UserDocument } from './schema/user.schema';
import { genSalt, hash} from 'bcrypt'
import { UserUpdateInfoDto } from './dto/user-update-info.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<UserDocument>) { }

    async create(userCreateDto: UserCreateDto){
        const salt = await genSalt(10)
        const user = new this.userModel({
            name: userCreateDto.name,
            surname: userCreateDto.surname,
            age: userCreateDto.age,
            email: userCreateDto.email,
            passwordHash: await hash(userCreateDto.password, salt)
        })
        return user.save()
    }

    async findUser(email: string){
        const candidate = await this.userModel.findOne({ email }).exec()
        return candidate
    }

    async updateInfo(id: string, userUpdateInfoDto: UserUpdateInfoDto){
        return await this.userModel.findByIdAndUpdate(id, userUpdateInfoDto, { new: true })
    }
}
