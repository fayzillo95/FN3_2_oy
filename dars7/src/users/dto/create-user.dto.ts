import { 
    IsAlpha, 
    IsAlphanumeric, 
    IsOptional, 
    IsString, 
    Max, 
    MaxLength,  
    Min, 
    MinLength 
} from "class-validator";

import { IsNumber } from "class-validator";

export class CreateUserDto {
    @IsString({message : "Username string bo'lishi kerak !"})
    @IsAlphanumeric(undefined, {message : "Username faqat harflar raqamlardan tashkil topgan bo'lishi kerak !"})
    @MinLength(3, {message : "Ism minimal 3 ta harfdan tashkil topgan bo'lishi kerak !"})
    @MaxLength(55, {message : "Ism uzunligi maximal 35 ta bo'lishi kerak !"})
    username: string

    @IsOptional()
    @IsNumber({}, { message: "Age number bo'lishi kerkak !" })
    @Min(1,{message : "Age minimal 1 bo'lishi kerak!"})
    @Max(101,{message : "Age maximal 101 bo'lishi kerak !"})
    age: number
// test
    @IsString()
    @IsAlpha(undefined, { message: "Ism faqat harflardan tashkil topgan bo'lishi kerak !" })
    @MinLength(3, {message : "Ism minimal 3 ta harfdan tashkil topgan bo'lishi kerak !"})
    @MaxLength(35, {message : "Ism uzunligi maximal 35 ta bo'lishi kerak !"})
    first_name: string

    @IsString()
    @IsAlpha(undefined, { message: "Familiya faqat harflardan tashkil topgan bo'lishi kerak !" })
    @MinLength(3, {message : "Familiya minimal 3 ta harfdan tashkil topgan bo'lishi kerak !"})
    @MaxLength(35, {message : "Familiya uzunligi maximal 35 ta bo'lishi kerak !"})
    last_name: string
}