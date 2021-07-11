import { Body, Controller, Post, HttpCode, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { JWTAuthGuard } from './guards/auth-jwt-guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post('login')
    async loginUser(@Body() authLoginDto: AuthLoginDto) {
        const user =  await this.authService.userValidation(authLoginDto)
        return this.authService.login(user)
    }
}
