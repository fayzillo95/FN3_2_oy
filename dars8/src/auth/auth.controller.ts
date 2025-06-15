import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("v1/register")
  register(@Body() data : CreateUserDto) : ReturnType<AuthService["register"]>{
    return this.authService.register(data)
  }
  @Post("v2/login")
  login(@Body() data : LoginUserDto) : ReturnType<AuthService["login"]>{
    return this.authService.login(data)
  }
}
