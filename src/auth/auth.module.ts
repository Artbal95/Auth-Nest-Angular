import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtConfigLogin } from 'src/config/jwt.config';
import { UserSchema } from 'src/user/schema/user.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JWTAuthGuard } from './guards/auth-jwt-guard';
import { JWTStrategy } from './strategy/auth.strategy';

@Module({
    imports: [
        MongooseModule.forFeature( [ { name: 'User', schema: UserSchema } ] ),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: JwtConfigLogin
        }),
        ConfigModule,
        PassportModule
    ],
    controllers: [AuthController],
    providers: [AuthService, JWTStrategy]
})
export class AuthModule {}
