import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './common/middleware/logger.middleware';
import { VersioningType } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 使用 cookie-parser 中间件并设置签名密钥
  // app.use(cookieParser('dbc'));

  app.use(
    session({
      secret: '/*a*b*c*/',
      resave: false,
      saveUninitialized: false,
      name: 'dbc',
      cookie: { maxAge: 1000 * 60 * 60 },
    }),
  );

  // somewhere in your initialization file
  app.use(compression());

  // app.enableVersioning({
  //   // type: VersioningType.URI,
  //   // defaultVersion: ['1', '2'],
  //   // type: VersioningType.HEADER,
  //   // header: 'Custom-Header',
  //   type: VersioningType.MEDIA_TYPE,
  //   key: 'v=',
  // });
  // app.use(logger);
  await app.listen(3000);
}
bootstrap();
