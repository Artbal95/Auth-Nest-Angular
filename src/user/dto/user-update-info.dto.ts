import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UserUpdateInfoDto {

    @IsString()
    name: string;

    @IsString()
    surname: string;

    @IsNumber()
    age:number;
}