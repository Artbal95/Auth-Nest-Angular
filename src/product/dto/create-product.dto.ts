import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsArray()
    @IsString( { each: true } )
    imageSrc: string[];

    @IsNumber()
    count: number;

    @IsNumber()
    price: number;

    @IsString()
    userId: string
}