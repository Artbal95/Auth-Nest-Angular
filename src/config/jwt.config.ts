import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import * as ms from 'ms'

export const JwtConfigLogin = async (configService: ConfigService): Promise<JwtModuleOptions> => {
    return {
        secret: configService.get('JWT_SECRET_KEY'),
        signOptions: {...getSignOptions()}
    }
}
        
const getSignOptions = () => ({
    expiresIn: ms('60s')
})