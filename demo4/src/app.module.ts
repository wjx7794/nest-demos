import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { CatsController } from './cats/cats.controller';
import { logger } from './common/middleware/logger.middleware';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './cats/filters/any-exception.filter';

@Module({
  imports: [CatsModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    AppService,
  ],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     // 该 apply() 方法可以使用单个中间件，也可以使用多个参数来指定多个多个中间件。
  //     .apply(logger)
  //     .exclude(
  //       // { path: 'cats', method: RequestMethod.GET },
  //       { path: 'cats', method: RequestMethod.POST },
  //       // 'cats/(.*)',
  //     )
  //     .forRoutes(CatsController);
  // }
}
