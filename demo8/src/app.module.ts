import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
// import { HttpExceptionFilter } from './cats/filters/http-exception.filter';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AllExceptionsFilter } from './cats/filters/any-exception.filter';
import { APP_PIPE } from '@nestjs/core';
import { UserModule } from './user/user.module';
import { CacheModule } from '@nestjs/cache-manager';
// import { LoggerModule } from './logger/logger.module';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from './logger/logger.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { RequestIdMiddleware } from './middlewares/request-id.middleware';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CaslModule } from './casl/casl.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { RedisModule } from './redis/redis.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MqttModule } from './mqtt/mqtt.module';
import { NatsModule } from './nats/nats.module';
import { RmqModule } from './rmq/rmq.module';
import { KafkaModule } from './kafka/kafka.module';
import { HeroModule } from './hero/hero.module';

@Module({
  imports: [
    CatsModule,
    UserModule,
    CacheModule.register({
      isGlobal: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    LoggerModule,
    EventEmitterModule.forRoot(),
    CaslModule,
    AuthModule,
    UsersModule,
    RedisModule,
    // ClientsModule.register([
    //   {
    //     // name 属性充当一个 injection token，可以在需要时将其用于注入 ClientProxy 实例。
    //     // name 属性的值作为注入标记，可以是任意字符串或 JavaScript 符号
    //     name: 'MATH_SERVICE',
    //     transport: Transport.REDIS,
    //     options: {
    //       host: 'localhost',
    //       port: 6379,
    //     },
    //   },
    //   // {
    //   //   name: 'MATH_SERVICE',
    //   //   transport: Transport.MQTT,
    //   //   options: {
    //   //     url: 'mqtt://localhost:1883',
    //   //   },
    //   // },
    // ]),
    MqttModule,
    NatsModule,
    RmqModule,
    KafkaModule,
    HeroModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_FILTER,
    //   useClass: AllExceptionsFilter,
    // },
    // {
    //   provide: APP_PIPE,
    //   useClass: ParseIntPipe,
    // },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: ThrottlerGuard,
    // },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestIdMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
