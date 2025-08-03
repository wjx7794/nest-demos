import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: Redis;

  // 模块初始化
  onModuleInit() {
    this.client = new Redis({
      host: 'localhost', // Redis 服务器地址
      port: 6379, // Redis 端口
    });
  }

  // 模块销毁
  onModuleDestroy() {
    this.client.quit();
  }

  // 1. 设置 redis 的 key-value
  async setValue(key, value): Promise<void> {
    await this.client.set(key, value);
  }

  // 2. 获取 redis 的 key-value
  async getValue(key): Promise<any> {
    return await this.client.get(key);
  }

  // 3. 发布消息给订阅者
  async publish(channel, message): Promise<number> {
    return await this.client.publish(channel, message);
  }
}
