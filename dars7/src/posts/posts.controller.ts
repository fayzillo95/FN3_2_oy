import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post("v1/create/:userId")
  create(@Body() createPostDto: {body : string}, @Param("userId") userId : string) : ReturnType<PostsService["create"]> {
    return this.postsService.create(createPostDto,+userId);
  }

  @Get()
  findAll() : ReturnType<PostsService["findAll"]>{
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) : ReturnType<PostsService["findOne"]>{
    if(isNaN(+id)) throw new BadRequestException("Invalid id !")
    return this.postsService.findOne(+id);
  }

  @Patch('v2/patch/:id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) : ReturnType<PostsService["update"]> {
    if(isNaN(+id)) throw new BadRequestException("Invalid id !")
    if(!updatePostDto || Object.values(updatePostDto).length === 0){
      throw new BadRequestException("Invalid body epty or undefined !")
    }
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete('v3/remove/:id')
  remove(@Param('id') id: string) :ReturnType<PostsService["remove"]>{
    if(isNaN(+id)) throw new BadRequestException("Invalid id is missing number !")
    return this.postsService.remove(+id);
  }
}
