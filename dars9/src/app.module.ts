import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './common/users/users.module';
import { CoreModule } from './core/core.module';
import { AuthModule } from './core/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './core/guards/auth.gurd';

@Module({
  imports: [UsersModule, CoreModule, AuthModule],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],
})
export class AppModule {}
