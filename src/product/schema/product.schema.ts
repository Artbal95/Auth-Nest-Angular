import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type ProductDocument = Product & mongoose.Document

@Schema({ timestamps: true } )
export class Product {
    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop( { type: () => [String] } )
    imageSrc: string[];

    @Prop()
    count: number;

    @Prop()
    price: number;

    @Prop( { type: mongoose.Schema.Types.ObjectId, ref: 'User' } )
    userId: mongoose.Types.ObjectId
}

export const ProductSchema = SchemaFactory.createForClass(Product)