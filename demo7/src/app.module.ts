import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    // 使用 ClientsModule 暴露的静态 register() 方法。
    // 此方法将数组作为参数，每个元素都具有 name 属性
    // 以及一个可选的 transport 属性（默认是Transport.TCP）
    // 以及特定于微服务的 options 属性。
    ClientsModule.register([
      {
        // name 属性充当一个 injection token，可以在需要时将其用于注入 ClientProxy 实例。
        // name 属性的值作为注入标记，可以是任意字符串或 JavaScript 符号
        name: 'MATH_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost', // 消费端连接的服务端地址
          port: 3001, // 消费端连接的服务端端口
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
