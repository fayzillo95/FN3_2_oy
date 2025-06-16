import { Dialect } from 'sequelize';
import { ConfigService } from '@nestjs/config';
export interface DBConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
  dialect: Dialect;
  autoLoadModels: boolean;
  synchronize: boolean;
}

export async function getDbConfig(
  configService: ConfigService,
): Promise<DBConfig> {
  return {
    username: configService.get('DB_USER') || 'postgres',
    password: configService.get('DB_PASS') || '12345678',
    database: configService.get('DB_NAME') || 'postgres',
    host: configService.get('DB_HOST') || 'localhost',
    port: Number(configService.get('DB_PORT')) || 5432,
    dialect: 'postgres',
    autoLoadModels: true,
    synchronize: true,
  };
}
