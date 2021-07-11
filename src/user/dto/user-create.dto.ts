import { IsNumber, IsString, Length, Max, Min } from 'class-validator';

export class UserCreateDto {
    @IsString()
    name: string;

    @IsString()
    surname: string;

    @IsNumber()
    age: number;

    @IsString()
    email: string;

    @IsString()
    @Length(8, 16, { message: 'Please Insert min 8, max 16 characters'})
    password: string
}