import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { Observable } from 'rxjs';
import { User } from 'src/common/users/entities/user.entity';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../types/user.enums';

export class AuthRole implements CanActivate {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private readonly jwt: JwtService,
    private reflector: Reflector,
  ) {
    this.reflector = reflector;
    this.userModel = userModel;
    this.jwt = jwt;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest<Request>();

    const role = request["role"]
    const id  = request["id"]   

    const roles = this.reflector.get<UserRole[]>('roles', context.getHandler());

    const exists = await this.userModel.findOne({ where: { id } });
    if (!exists) throw new ForbiddenException('Not signeded user !');

    if (!roles[0] || roles.includes[role]) {
        return true
    }else{
      throw new ForbiddenException(
        `${exists.username} not allowed ${request.method}ted !`,
      );
    }
  }

//   async checkRole(id: number, roles: UserRole[], request: Request) {


//     if (!roles.includes(exists.role as UserRole)) {
//       throw new ForbiddenException(
//         `${exists.username} not allowed ${request.method}ted !`,
//       );
//     }
//     return true;
//   }
}
