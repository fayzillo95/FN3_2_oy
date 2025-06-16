import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from './config/jwt.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeConnectModule } from './sequelize/sequelize..connect.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
    SequelizeConnectModule,
  ],
})
export class CoreModule {}
