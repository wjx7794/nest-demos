import { Injectable } from '@nestjs/common';
import { OnEvent, EventEmitter2 } from '@nestjs/event-emitter';
import { UserCreatedEvent } from './UserCreatedEvent';

@Injectable()
export class UserListener {
  constructor(private eventEmitter: EventEmitter2) {}

  @OnEvent('user.created', {
    // 是否异步处理事件
    async: true,
    // 是否将处理函数转为 Promise
    promisify: false,
    // 使用 process.nextTick() 调度处理
    nextTick: false,
    // 是否抑制错误
    suppressErrors: false,
  })
  onUserCreatedEvent(event: UserCreatedEvent) {
    console.log('🍂 onUserCreatedEvent =>', event.userId);
  }

  // 当配置 wildcard: true 时，可以使用通配符匹配多个事件
  @OnEvent('user.*')
  onUserAllEvent(event: any) {
    // 获取实际事件名
    const eventName = (this.eventEmitter as any).event;
    console.log('🍃 onUserAllEvent =>', event, eventName);
  }
}
