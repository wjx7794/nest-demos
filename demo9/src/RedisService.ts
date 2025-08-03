import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private subscriber: Redis;

  // 模块初始化
  onModuleInit() {
    this.subscriber = new Redis({
      // Redis 服务器地址
      host: 'localhost',
      // Redis 端口
      port: 6379,
    });
    // 订阅频道
    this.subscribeChannel('child');
  }

  // 模块销毁
  onModuleDestroy() {
    this.subscriber.quit();
  }

  // 订阅频道
  private subscribeChannel(channel: string) {
    this.subscriber.subscribe(channel, (err, count) => {
      if (err) {
        console.error('Failed to subscribe: %s', err.message);
      } else {
        console.log(
          `Subscribed to ${count} channel(s). Listening for updates on ${channel}...`,
        );
      }
    });

    // 在这里处理接收到的消息
    this.subscriber.on('message', (channel, message) => {
      console.log(`Received message from ${channel}: ${message}`);
    });
  }
}
