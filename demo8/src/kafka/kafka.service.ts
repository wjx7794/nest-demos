import { Injectable } from '@nestjs/common';
import { Kafka } from 'kafkajs';

@Injectable()
export class KafkaService {
  private kafka = new Kafka({
    clientId: 'my-kafka-group',
    brokers: ['localhost:9092'], // 替换为你的 Kafka broker 地址
  });

  private producer = this.kafka.producer();

  // 模块初始化
  async onModuleInit() {
    await this.producer.connect();
  }

  // 模块销毁
  async onModuleDestroy() {
    await this.producer.disconnect();
  }

  // 发布消息
  async publishMessage(topic: string, message: string) {
    return await this.producer.send({
      topic,
      messages: [{ value: message }],
    });
  }
}
