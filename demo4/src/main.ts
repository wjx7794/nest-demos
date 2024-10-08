import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './common/middleware/logger.middleware';
import { VersioningType } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as compression from 'compression';
// import * as helmet from 'helmet';
import helmet from 'helmet';
// import {} from '@types/helmet'
import * as csurf from 'csurf';
import rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 使用 cookie-parser 中间件并设置签名密钥
  // app.use(cookieParser('dbc'));

  app.enableCors();

  app.use(
    session({
      secret: '/*a*b*c*/',
      resave: false,
      saveUninitialized: false,
      name: 'dbc',
      cookie: { maxAge: 1000 * 60 * 60 },
    }),
  );

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );

  // somewhere in your initialization file
  app.use(compression());

  // app.use(helmet());
  // app.use(helmet.hidePoweredBy({ setTo: 'Wang' }));
  // Ask Helmet to ignore the X-Powered-By header.
  // app.use(helmet.hidePoweredBy());
  app.use(helmet());

  app.use(csurf());
  // Not required, but recommended for Express users:
  // app.disable("x-powered-by");

  // Ask Helmet to ignore the X-Powered-By header.
  // app.use(
  //   helmet({
  //     xPoweredBy: false,
  //   }),
  // );
  // app.use(
  //   helmet({
  //     xPoweredBy: false,
  //   }),
  // );
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
