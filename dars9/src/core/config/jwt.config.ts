import { JwtModule, JwtModuleOptions, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { DynamicModule } from '@nestjs/common';

export const getJwtConfig = (configService: ConfigService): JwtModule => ({
  secret: configService.get<string>('JWT_KEY') || 'secret',
  signOptions: {
    expiresIn: configService.get<string>('JWT_EXPIRES_IN') || '24h',
  },
});
