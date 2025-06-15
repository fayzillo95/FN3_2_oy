import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entitys';
import { Posts } from 'src/posts/entities/posts.entitys';

@Module({
  imports : [SequelizeModule.forFeature([User,Posts])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
