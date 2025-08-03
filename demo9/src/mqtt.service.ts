import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { connect } from 'mqtt';

@Injectable()
export class MqttService implements OnModuleInit, OnModuleDestroy {
  private client;

  // MQTT 服务器的地址和主题
  private readonly MQTT_BROKER = 'mqtt://localhost:1883'; // 如果 Mosquitto 在本地运行
  private readonly MQTT_TOPIC = 'child'; // 你想要订阅的主题

  // 模块初始化
  onModuleInit() {
    // 连接到 MQTT 服务器
    this.client = connect(this.MQTT_BROKER);

    // 连接成功时的回调
    this.client.on('connect', () => {
      console.log('Connected to MQTT broker');
      this.client.subscribe(this.MQTT_TOPIC, (err) => {
        if (!err) {
          console.log(`Subscribed to topic: ${this.MQTT_TOPIC}`);
        } else {
          console.error(`Failed to subscribe: ${err}`);
        }
      });
    });

    // 处理接收到的消息
    this.client.on('message', (topic, message) => {
      console.log(`Received message: ${message.toString()} on topic: ${topic}`);
    });
  }

  // 模块销毁
  onModuleDestroy() {
    // 关闭连接
    if (this.client) {
      this.client.end();
    }
  }
}
