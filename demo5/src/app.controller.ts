import { Body, Controller, Post } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // 订阅主题: father
  // @MessagePattern('father')
  // getData(@Payload() data: any) {
  //   console.log('Received data: ', data);
  //   return { message: 'Data received successfully!' };
  // }

  // // 通过 POST 请求触发发布消息
  // @Post('send')
  // async sendMessage(@Body() body) {
  //   const { topic, message } = body || {};
  //   return this.appService.publishMessage(topic, message);
  // }
}
