import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  Query,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Roles } from 'src/core/decorator/user.role.decorator';
import { UserRole } from 'src/core/types/user.enums';
import { AuthRole } from 'src/core/guards/auth.role';
import { AuthGuard } from 'src/core/guards/auth.gurd';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch('v2/update/:id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): ReturnType<UsersService['update']> {
    if (
      isNaN(+id) ||
      !updateUserDto ||
      Object.values(updateUserDto).length === 0
    )
      throw new BadRequestException('invalid id or data !');
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete('v3/delete/:id')
  remove(@Param('id') id: string): ReturnType<UsersService['remove']> {
    if (isNaN(+id)) throw new BadRequestException('invalid id !');
    return this.usersService.remove(+id);
  }
  
  @SetMetadata("isPublic",true)
  @Get('v4/getall')
  findAll(): ReturnType<UsersService['findAll']> {
    return this.usersService.findAll();
  }

  @UseGuards(AuthRole)
  @SetMetadata("roles",[UserRole.Admin,UserRole.SuperAdmin])
  @Get('v5/:id')
  findOne(@Param('id') id: string): ReturnType<UsersService['findOne']> {
    if (isNaN(+id)) throw new BadRequestException('invalid id !');
    return this.usersService.findOne(+id);
  }

  @SetMetadata("isPublic",true)
  @Get('v6')
  findByQuery(@Query() query: Partial<Omit<User, 'passwordHash'>>) {
    !Object.keys(query).every((key) => {
      if (!['username', 'role', 'id'].includes(key)) {
        throw new BadRequestException(`Invalid field "${key}" !`);
      }
    });

    return this.usersService.gettByQuery(query);
  }
}
