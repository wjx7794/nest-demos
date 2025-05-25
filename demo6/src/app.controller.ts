import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // 1. 请求-响应
  @Get('sum')
  async getSum(): Promise<number> {
    return this.appService.getSum([1, 2, 3, 4, 5]);
  }

  // 2. 事件驱动
  @Get('publish')
  async publish(): Promise<any> {
    this.appService.publish({ name: 'Ryan' });
    return '已发送';
  }
}
