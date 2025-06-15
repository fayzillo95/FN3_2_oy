import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModuleConnect } from './sequelize/sequelize.module';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from './utils/configuratsiya';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ".env"
        }),
        SequelizeModuleConnect,

        JwtModule.registerAsync({
            global: true,
            inject: [ConfigService],
            useFactory: getJwtConfig
        })
    ]
})
export class CoreModule { }


