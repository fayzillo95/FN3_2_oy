import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/common/users/entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserTypes } from '../types/user.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    @InjectModel(User) private readonly userModel: typeof User,
  ) {
    this.jwt = jwt;
    this.userModel = userModel;
  }

  async register(
    createUserDto: Omit<UserTypes, 'id' | 'role'>,
  ): Promise<{ token: string }> {
    const existsConunt = await this.userModel.findAndCountAll({
      where: { username: createUserDto.username },
      limit: 1,
    });
    if (existsConunt.count > 0)
      throw new ConflictException('Username already exists !');
    console.log(existsConunt);
    createUserDto.passwordHash = await bcrypt.hash(
      createUserDto.passwordHash,
      10,
    );
    const newUser = await this.userModel.create(createUserDto);
    const token = this.jwt.sign({ id: newUser.id , role : newUser.role});

    return { token };
  }

  async login(loginDto: LoginDto) {
    const exists = await this.userModel.findOne({
      where: { username: loginDto.username },
    });

    if (!exists)
      throw new BadRequestException('Invalid username or passsword !');
    const decodePass = await bcrypt.compare(
      loginDto.passwordHash,
      exists.passwordHash,
    );

    if (!decodePass) throw new BadRequestException('Invalid password !');
    const token = await this.jwt.sign({ id: exists.id ,role : exists.role});
    return { token };
  }
}
