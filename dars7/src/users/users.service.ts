import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/users/entities/user.entitys';
import { Posts } from 'src/posts/entities/posts.entitys';
import {InjectModel} from "@nestjs/sequelize"

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

  async create(createUserDto: Omit<CreateUserDto, "id">) {
    const exists =  await this.models.userModel.create(createUserDto)
    return 'This action adds a new user';
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
