import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getDbConfig } from '../utils/configuratsiya';
// 
@Module({
  imports: [
    ConfigModule,
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: getDbConfig,
    }),
  ],
})
export class SequelizeModuleConnect {}
