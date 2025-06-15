import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from 'src/users/entities/user.entitys';
import { Posts } from './entities/posts.entitys';
import { InjectModel } from '@nestjs/sequelize';
import { ErrorHandlers } from 'src/core/error-handlers/error.handlers';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class PostsService {
  db: {
    userMOdel: typeof User,
    postsModel: typeof Posts
  }

  constructor(
    @InjectModel(User) user: typeof User,
    @InjectModel(Posts) posts: typeof Posts
  ) {
    this.db = {
      userMOdel: user,
      postsModel: posts
    }
  }

  async create(createPostDto: CreatePostDto, userId: number): Promise<{ message: string, newPost: Posts }> {
    console.log(createPostDto)
    const existsUser = await this.db.userMOdel.findOne({ where: { id: userId } })
    if (!existsUser) throw new NotFoundException("User not found !")
    try {
      console.log({data :{ userId, ...createPostDto }})
      const result = await this.db.postsModel.create({ userId : userId, body : createPostDto.body })
      const dto = plainToInstance(Posts, result.toJSON())
      if (result) {
        return {
          message: "Post created sucessfully!",
          newPost: dto
        };
      } else {
        throw new HttpException("Post create failed !", 500)
      }
    } catch (error) {
      const stack = "src/posts/posts.service.ts   create function "
      throw new HttpException(ErrorHandlers.getErrorExeption(error, stack), 500)
    }
  }

  async findAll(): Promise<Posts[]> {
    try {
      const result = await this.db.postsModel.findAll({order :[['id' ,'asc']]})
      const dto = result.map(resurs => plainToInstance(Posts, resurs.toJSON()))
      return dto;
    } catch (error) {
      const stack = "src/posts/posts.service.ts:42"
      throw new HttpException(ErrorHandlers.getErrorExeption(error, stack), 500)
    }
  }

  async findOne(userId: number): Promise<Posts[]> {
    try {
      const result = await this.db.postsModel.findAll({
        where: { userId }
      })
      const dto = result.map(resurs => plainToInstance(Posts, resurs.toJSON()))
      return dto;
    } catch (error) {
      const stack = "src/posts/posts.service.ts  findOne function "
      throw new HttpException(ErrorHandlers.getErrorExeption(error, stack), 500)
    }
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<{ message: string, updatedPost: Posts }> {
    try {
      const [affectedCount, [newPost]] = await this.db.postsModel.update(updatePostDto, {
        where: { id },
        returning: true
      })
      if (affectedCount !== 0) {
        const updatedPost = plainToInstance(Posts, newPost.toJSON())
        return {
          message: "Post updated !",
          updatedPost
        }
      } else {
        throw new HttpException("Post update not completed !", 500)
      }
    } catch (error) {
      const stack = "src/posts/posts.service.ts update function"
      throw new HttpException(ErrorHandlers.getErrorExeption(error, stack), 500)
    }
  }

  async remove(id: number) {
    try {
      const result = await this.db.postsModel.destroy({ where: { id } })
      if (result === 0) {
        throw new NotFoundException("Post topilmadi yoki allaqachon o‘chirilgan");
      }
      return { message: "Post muvaffaqiyatli o‘chirildi!" }
    } catch (error) {
      const stack = "src/posts/posts.service.ts:XX" // real qator raqami
      throw new HttpException(ErrorHandlers.getErrorExeption(error, stack), 500)
    }
  }
  async removeByUserId(id : number){
    const existsCount = await this.db.postsModel.findAndCountAll({where : {userId : id},limit : 1})
    if(existsCount.count === 0) throw new NotFoundException("Posts not found !")
    const destroyPosts = await this.db.postsModel.destroy({where : {userId : id}})
    return {message : `Posts deleted ${existsCount} posts`}
  }
}
