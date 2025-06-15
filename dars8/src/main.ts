import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getDbConfig, getJwtConfig } from './core/utils/configuratsiya';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const config = new ConfigService()
  // const resault = await getDbConfig(config)
  // console.log(resault)
  const configJwt = await getJwtConfig(config)

  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist : true,
    forbidUnknownValues : true,
    transform : true
  }))
  
  app.setGlobalPrefix("api")
  
  await app.listen(process.env.PORT ?? 3000);
  console.log("Server is running ...........")
  // console.log(configJwt)
}
bootstrap();
