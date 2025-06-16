import { getDbConfig } from '../config/db.config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { get } from 'http';
@Module({
  imports: [
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: getDbConfig,
    }),
  ],
})
export class SequelizeConnectModule {}
