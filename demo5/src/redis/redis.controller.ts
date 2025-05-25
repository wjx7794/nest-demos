import { Controller, Post, Body } from '@nestjs/common';
import { RedisService } from './redis.service';

@Controller('redis')
export class RedisController {
  constructor(private readonly redisService: RedisService) {}

  // 1. 设置 redis 的 key-value
  @Post('set')
  async setValue(@Body() body) {
    const { key, value } = body || {};
    await this.redisService.setValue(key, value);
    return { message: `${key} has been set to ${value}` };
  }

  // 2. 获取 redis 的 key-value
  @Post('get')
  async getValue(@Body() body) {
    const { key } = body || {};
    const value = await this.redisService.getValue(key);
    return { [key]: value };
  }

  // 3. 发布消息给订阅者
  @Post('publish')
  async publish(@Body() body) {
    const { channel, message } = body || {};
    const count = await this.redisService.publish(channel, message);
    return { message: `Message published to ${count} subscribers` };
  }
}
