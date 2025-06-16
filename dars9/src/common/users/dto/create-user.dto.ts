import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  passwordHash: string;
  @IsString()
  @IsOptional()
  @MaxLength(50, { message: 'Username must not exceed 50 characters' })
  username: string;
}
