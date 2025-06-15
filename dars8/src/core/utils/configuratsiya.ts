import { ConfigService } from '@nestjs/config';
import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { config } from 'process';
import { Dialect } from 'sequelize';


export const getJwtConfig = async (config: ConfigService) => {
    return {
        global : true,
        secret: config.get('JWT_SECRET'),
        signOptions: { expiresIn: '24h' }
    }
}

export const getDbConfig = async (
    configService: ConfigService,
): Promise<SequelizeModuleOptions> => {
    return {
        dialect: 'postgres' as Dialect,
        host: configService.get<string>('DB_HOST'),
        port: parseInt(configService.get<string>('DB_PORT') || '5432', 10),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadModels: true,
        synchronize: true,
    };
};
