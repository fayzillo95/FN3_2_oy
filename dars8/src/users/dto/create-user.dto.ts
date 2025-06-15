import { IsAlphanumeric, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsAlphanumeric()
    @IsNotEmpty()
    username : string

    @IsString()
    password :string
}
export class LoginUserDto {
    @IsString()
    @IsAlphanumeric()
    @IsNotEmpty()
    username : string

    @IsString()
    password :string
}
