
import { User } from '../../users/entities/user.entitys';
import { Posts } from '../../posts/entities/posts.entitys';
import {SequelizeModule} from "@nestjs/sequelize"
import { Module } from '@nestjs/common';

@Module({
    imports : [
        SequelizeModule.forRoot({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'fayzullo',
        password: '12345678',
        database: 'dars7',
        models : [User,Posts],
        autoLoadModels : true,
        synchronize : true
      })
    ]
})

export class SequlizeConect {}