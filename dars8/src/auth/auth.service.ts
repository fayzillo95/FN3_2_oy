import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import bcrypt from "bcrypt"

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User) private readonly userModel : typeof User,
        private readonly jwt : JwtService
    ){
        this.userModel = userModel
        this.jwt = jwt
    }

    async login(user : CreateUserDto) {
        const exists = await this.userModel.findOne({where : {username : user.username}})
        if(!exists) throw new ForbiddenException("Invalid username or password !")
        const decodePass = await bcrypt.compare(user.password,exists.password)
        if(!decodePass) throw new ForbiddenException("Invalid password or username !")
        const token = this.jwt.sign({id : exists.toJSON().id})
        return {accessToken : token}
    }
    
    async register(user : CreateUserDto){
        const exists = await this.userModel.findOne({where : {username : user.username}})
        if(exists) throw new ConflictException("username already exists !")
        user.password = await bcrypt.hash(user.password,10)
        const newUser = await this.userModel.create({
            username : user.username,
            password : user.password
        })
        const id =  newUser.toJSON().id
        const token = this.jwt.sign({id})
        return {accessToken : token}
    }
}
