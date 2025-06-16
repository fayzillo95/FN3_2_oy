import {
  BadRequestException,
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import bcrypt from 'bcrypt';
import { UserTypes } from 'src/core/types/user.types';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    private readonly jwt: JwtService,
  ) {
    this.userModel = userModel;
    this.jwt = jwt;
  }
  async findAll(): Promise<Pick<User, 'id' | 'username' | 'role'>[]> {
    const result = await this.userModel.findAll({
      attributes: ['id', 'username', 'role'],
    });
    return result.map((user) => user.toJSON());
  }

  async findOne(id: number): Promise<Pick<User, 'id' | 'username' | 'role'>> {
    const user = await this.userModel.findOne({
      where: { id },
      attributes: { exclude: ['passwordHash'] },
    });
    if (user) {
      return user.toJSON();
    }
    throw new NotFoundException('User NOt found !');
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<
    | { message: string; data: { id: number; username: string; role: string } }
    | any
  > {
    const existsConunt = await this.userModel.findAndCountAll({
      where: { id },
    });
    if (!existsConunt) throw new NotFoundException('Username not found !');
    if (updateUserDto.passwordHash) {
      updateUserDto.passwordHash = await bcrypt.hash(
        updateUserDto.passwordHash,
        10,
      );
    }
    const [affectedCount] = await this.userModel.update(updateUserDto, {
      where: { id },
    });
    if (affectedCount === 0)
      throw new ConflictException('User updated not complieted !');
    const updatedUser = await this.userModel.findByPk(id, {
      attributes: ['id', 'username', 'role'],
    });
    return { message: 'User updated', data: updatedUser };
  }

  async remove(id: number): Promise<{ message: string }> {
    const existsConunt = await this.userModel.findAndCountAll({
      where: { id },
    });
    if (existsConunt.count === 0)
      throw new NotFoundException('Username not found !');
    const deleted = await this.userModel.destroy({ where: { id } });
    if (deleted === 0) {
      throw new HttpException('User deleted not complieted !', 500);
    }
    return { message: 'User deleted !' };
  }

  async gettByQuery(query: Partial<Omit<User, 'passwordHash'>>) {
    if (query.id) {
      if (isNaN(+query.id)) throw new BadRequestException('Invalid id !');
      query.id = +query.id;
    }
    console.log(query);
    const user = await this.userModel.findAll({
      where: query,
    });
    return user;
  }
}
