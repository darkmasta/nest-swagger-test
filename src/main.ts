import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as basicAuth from 'express-basic-auth';
import { AppModule } from './app.module';

import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as passport from 'passport';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.use(
    session({
      secret: 'some secret',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 360000 }
    })
  )

  app.use(passport.initialize())
  app.use(passport.session())

  const options = new DocumentBuilder()
    .setTitle('NestJS Middleware Test')
    .setDescription('Implemenet a simple requst interceptor for authorization')
    .setVersion('0.0.1')
    .addBearerAuth({ in: 'header', type: 'http' })
    .build();

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)

  await app.listen(3000);
}
bootstrap();
