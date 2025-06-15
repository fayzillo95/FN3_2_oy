import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import bcrypt from "bcrypt"


@Injectable()
export class UsersService {

  constructor(@InjectModel(User) private readonly userModel : typeof User){
    this.userModel = userModel
  }

  async findAll() {
    const data = await this.userModel.findAll()
    return data;
  }

  async findOne(id: number) {
    const user = await this.userModel.findOne({where : {id}})
    if(!user) throw new NotFoundException("User not found !")
    return {data  : user};
  }

  async update(id: number, updateUserDto: Partial<UpdateUserDto>) {
    const exists = await this.userModel.findOne({where : {id}})
    if(!exists) throw new NotFoundException("User not found !")
    if(updateUserDto?.password) exists.password = await bcrypt.hash(updateUserDto.password,10)
    if(updateUserDto?.username) exists.username = updateUserDto.username
    await exists.save()
    return {message : "User updated !"};
  }

  async remove(id: number) {
    const exists = await this.userModel.findOne({where : {id}})
    if(!exists) throw new NotFoundException("User not found !")
    await exists.destroy()  
    return {message : "User deleted"};
  }

}
