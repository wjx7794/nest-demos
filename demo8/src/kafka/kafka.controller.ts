import { Body, Controller, Post, Get } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaService } from './kafka.service';

@Controller('kafka')
export class KafkaController {
  constructor(private readonly kafkaService: KafkaService) {}

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
    console.log('body =>', body);
    return this.kafkaService.publishMessage(topic, message);
  }
}
