import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule }  '@nestjs/swagger'
import { AppModule } from './app.module';

import * as cookieParser from 'cookie-parser';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('NestJS Middleware Test')
    .setDescription('Implemenet a simple requst interceptor for authorization')
    .setVersion('0.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)

  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
