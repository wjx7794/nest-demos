import { Controller, Post, Body } from '@nestjs/common';
import { MqttService } from './mqtt.service';

@Controller('mqtt')
export class MqttController {
  constructor(private readonly mqttService: MqttService) {}

  // 发布消息
  @Post('publish')
  async publish(@Body() body) {
    const { topic, message } = body || {};
    await this.mqttService.publishMessage(topic, message);
    return { topic, message };
  }
}
