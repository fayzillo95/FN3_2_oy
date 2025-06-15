import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("v6/getall")
  findAll() : ReturnType<UsersService["findAll"]> {
    return this.usersService.findAll();
  }

  @Get('v5/:id')
  findOne(@Param('id') id: string) : ReturnType<UsersService["findOne"]> {
    if(isNaN(+id)) throw new HttpException("Invalid id !",400)
    return this.usersService.findOne(+id);
  }

  @Patch('v3/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) : ReturnType<UsersService["update"]>{
    if(isNaN(+id)) throw new HttpException("Invalid id !",400)
    if(!updateUserDto || Object.values(updateUserDto).length === 0) throw new HttpException("Invalid body !",400)
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete('v4/:id')
  remove(@Param('id') id: string) : ReturnType<UsersService["remove"]>{
    if(isNaN(+id)) throw new HttpException("Invalid id !",400)
    return this.usersService.remove(+id);
  }
}
