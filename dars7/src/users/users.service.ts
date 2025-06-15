import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/users/entities/user.entitys';
import { Posts } from 'src/posts/entities/posts.entitys';
import {InjectModel} from "@nestjs/sequelize"
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  models : {
    userModel : typeof User,
    postsModel : typeof Posts
  }
  constructor (
    @InjectModel(User)  private readonly user : typeof User,
    @InjectModel(Posts) private readonly posts : typeof Posts 
  ){
    this.models = {userModel : user ,postsModel : posts}
  }

  async create(createUserDto: CreateUserDto) {
    const exists =  await this.models.userModel.create({createUserDto})
    const dto = plainToInstance(User,exists.toJSON())
    return dto;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
