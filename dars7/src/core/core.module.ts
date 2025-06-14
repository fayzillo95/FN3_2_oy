import { Module } from "@nestjs/common";
import { UsersModule } from "src/users/users.module";
import { SequlizeConect } from "./database/sequlize.module";
import { PostsModule } from "src/posts/posts.module";

@Module({
    imports : [SequlizeConect,UsersModule, PostsModule]
})

export class CoreModule {}