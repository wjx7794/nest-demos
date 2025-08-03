import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(@Inject('MATH_SERVICE') private client: ClientProxy) {}

  // 1. 请求-响应
  async getSum(data: number[]): Promise<any> {
    // send() 方法旨在调用微服务，接受两个参数: pattern 和 payload。
    // pattern 是 @MessagePattern() 修饰符中定义的模式
    // payload 是传输到另一个微服务的消息
    // 该方法返回一个 cold Observable 对象
    return this.client.send<any>({ cmd: 'sum' }, data);
  }

  // 2. 事件驱动
  async publish(data) {
    // emit() 方法是将事件发布到消息代理，接受两个参数: pattern 和 payload。
    // pattern 是 @EventPattern() 修饰符中定义的模式
    // payload 是传输到另一个微服务的消息
    // 此方法返回一个 hot Observable，意味着无论是否显式订阅该 Observable，代理都将立即尝试传递事件。
    return this.client.emit<any>('createUser', data);
  }
}
