
import { User } from './models/user.model';
import { Posts } from './models/posts.model';
import {SequelizeModule} from "@nestjs/sequelize"
import { Module } from '@nestjs/common';

@Module({
    imports : [
        SequelizeModule.forRoot({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'password',
        database: 'nest',
        models : [User,Posts],
        autoLoadModels : true,
        synchronize : true
      })
    ]
})

export class SequlizeConect {}