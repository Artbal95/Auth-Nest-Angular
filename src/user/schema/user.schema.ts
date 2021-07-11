import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document 

@Schema({ timestamps: true})
export class User {
    @Prop()
    name: string;

    @Prop()
    surname: string;

    @Prop()
    age: number;

    @Prop()
    email: string;

    @Prop()
    passwordHash: string
}

export const UserSchema = SchemaFactory.createForClass(User)