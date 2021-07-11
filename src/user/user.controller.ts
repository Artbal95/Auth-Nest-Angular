import { BadGatewayException, UsePipes, ValidationPipe, Body, Controller, Post, Patch, Param } from '@nestjs/common';
import { IdValidPipe } from 'src/pipes/id-validation.pipe.ts';
import { USER_EMAIL_EXIST_ERROR } from './constants/user.constants';
import { UserCreateDto } from './dto/user-create.dto';
import { UserUpdateInfoDto } from './dto/user-update-info.dto';
import { UserService } from './user.service';

@Controller('register')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UsePipes(new ValidationPipe())
    @Post('create')
    async createNewUser(@Body() userCreateDto: UserCreateDto){
        const candidate = await this.userService.findUser(userCreateDto.email)
        if(candidate){
            throw new BadGatewayException(USER_EMAIL_EXIST_ERROR)
        }
        return this.userService.create(userCreateDto)
    }

    @Patch('update/info/:id')
    async updateUserInfo(@Param('id', IdValidPipe) id: string, @Body() userUpdateInfoDto: UserUpdateInfoDto){
        return this.userService.updateInfo(id, userUpdateInfoDto)
    }
}
