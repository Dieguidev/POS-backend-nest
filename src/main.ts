import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as morgan from 'morgan';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      // forbidNonWhitelisted: true,
    })
  );

  app.useStaticAssets(join(__dirname, '../public'), {
    prefix: '/api/',
  });

  app.use(morgan('combined'));

  await app.listen(4000);
}
bootstrap();
