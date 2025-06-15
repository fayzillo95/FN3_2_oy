import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/entities/user.entitys';
import { Posts } from './entities/posts.entitys';

@Module({
  imports : [SequelizeModule.forFeature([User,Posts])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
