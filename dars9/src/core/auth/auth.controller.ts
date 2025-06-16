import { Body, Controller, Post, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
@SetMetadata("isPublic",true)
export class AuthController {
  constructor(private readonly authService: AuthService) {
    this.authService = authService;
  }
  @Post('v1/resgister')
  create(@Body() createUserDto: LoginDto): ReturnType<AuthService['register']> {
    return this.authService.register(createUserDto);
  }

  @Post('v2/login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
