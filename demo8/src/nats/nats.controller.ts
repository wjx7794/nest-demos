import { Body, Controller, Post, Get } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { NatsService } from './nats.service';

@Controller('nats')
export class NatsController {
  constructor(private readonly natsService: NatsService) {}

  // 订阅主题: father
  @MessagePattern('father')
  getData(@Payload() data: any) {
    console.log('Received data: ', data);
    return { message: 'Data received successfully!' };
  }

  // 通过 POST 请求触发发布消息
  @Post('publish')
  async sendMessage(@Body() body) {
    const { topic, message } = body || {};
    return this.natsService.publishMessage(topic, message);
  }

  @Get()
  info() {
    return 123;
  }
}
