import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("v1/register")
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get("v4/getall")
  findAll() {
    return this.usersService.findAll();
  }

  @Get('v5/getone/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch('/v2/update/:id')
  update(@Param('id') id: string, @Body() updateUserDto: Partial<UpdateUserDto>) : ReturnType<UsersService["update"]> {
    if(!updateUserDto || Object.values(updateUserDto).length === 0) throw new BadRequestException("Body is empty not allowwed !")
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete('v3/delete/:id')
  remove(@Param('id') id: string) {
    if(isNaN(+id)){
      throw new BadRequestException("Invalid id !")
    }
    return this.usersService.remove(+id);
  }
}
