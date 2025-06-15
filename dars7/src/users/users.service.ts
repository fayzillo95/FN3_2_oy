import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/users/entities/user.entitys';
import { Posts } from 'src/posts/entities/posts.entitys';
import { InjectModel } from "@nestjs/sequelize"
import { plainToInstance } from 'class-transformer';
import { first } from 'rxjs';

@Injectable()
export class UsersService {
  models: {
    userModel: typeof User,
    postsModel: typeof Posts
  }
  constructor(
    @InjectModel(User) private readonly user: typeof User,
    @InjectModel(Posts) private readonly posts: typeof Posts
  ) {
    this.models = { userModel: user, postsModel: posts }
  }

  async create(createUserDto: CreateUserDto) {

    const newUser = await this.models.userModel.create({
      first_name: createUserDto.first_name,
      last_name: createUserDto.last_name,
      username: createUserDto.username
    })
    const dto = plainToInstance(User, newUser.toJSON())
    return dto;
  }
  async findByUserIdAllPosts(id: number) {
    const user = await this.models.userModel.findOne({ where: { id } })
    if (!user) throw new NotFoundException("User not found !")
    const userPosts = await this.models.postsModel.findAll({ where: { userId: id }, attributes: ["id", "body", "createAt", "updatedAt"] })
    return {
      message: "POsts read successfully !",
      username: user.username,
      posts: userPosts
    }
  }
  async findAll(): Promise<User[]> {
    const result = await this.models.userModel.findAll()
    const dto = result.map(user => plainToInstance(User, user.toJSON()))
    return dto;
  }

  async findOne(id: number) {
    const existsUser = await this.models.userModel.findOne({ where: { id } })
    if (!existsUser) throw new NotFoundException("User not found !")
    return existsUser
  }

  async update(id: number, updateUserDto: Partial<UpdateUserDto>) {
    const existsUser = await this.models.userModel.findOne({ where: { id } })
    if (!existsUser) throw new NotFoundException("User not found !")
    await existsUser.update(updateUserDto)
    return existsUser;
  }

  async remove(id: number) {
    const existsPost = await this.models.postsModel.findAndCountAll({
      where: { userId: id }
    })
    if (existsPost.count > 0) throw new ConflictException("User posts exists delet not alloed !")
    const existsUser = await this.models.userModel.findOne({ where: { id } })
    if (!existsUser) throw new NotFoundException("User not found !")

    await existsUser.destroy()

    return { message: "User deleted !" };
  }
}
