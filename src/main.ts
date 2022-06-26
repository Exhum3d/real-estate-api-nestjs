import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import * as passport from 'passport';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    }))

  // the secret must be saved in a .env file
  // the session must be saved on an external storage such as redis
  app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3600000 }
  }));

  app.use(passport.initialize())
  app.use(passport.session())

  await app.listen(3000);
}

bootstrap();
