import { IsString, Length } from 'class-validator';

export class AuthLoginDto {
    @IsString()
    email: string;

    @Length(8, 16, { message: 'Please Insert min 8, max 16 characters' })
    @IsString()
    password: string
}