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
import { ConfigModule } from '@nestjs/config';
import { MyModule } from './my-service/my-service.module';
import { UserModule } from './user/user.module';
import { CacheModule } from '@nestjs/cache-manager';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CaslModule } from './casl/casl.module';

@Module({
  imports: [
    CatsModule,
    ConfigModule.forRoot(),
    MyModule,
    UserModule,
    CacheModule.register({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    UsersModule,
    CaslModule,
  ],
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
