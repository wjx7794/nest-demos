import { Body, Controller, Post } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RmqService } from './rmq.service';

@Controller('rmq')
export class RmqController {
  constructor(private readonly rmqService: RmqService) {}

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
    return this.rmqService.publishMessage(topic, message);
  }
}
