import { Controller } from '@nestjs/common';
import { MessagePattern, EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // 1. 消息处理程序 (在服务之间交换消息)
  // accumulate() 处理程序正在监听符合 {cmd :'sum'} 模式的消息
  // 模式处理程序采用单个参数，即从客户端传递的 data
  // @MessagePattern({ cmd: 'sum' })
  @MessagePattern('sum')
  accumulate(data: number[]): number {
    return this.appService.accumulate(data);
  }

  // 2. 事件处理程序 (只想发布事件而不等待响应)
  @EventPattern('createUser')
  async createUser(data) {
    return this.appService.createUser(data);
  }
}
