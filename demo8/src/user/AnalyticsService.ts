import { OnModuleInit, OnModuleDestroy, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class AnalyticsService implements OnModuleInit, OnModuleDestroy {
  constructor(private eventEmitter: EventEmitter2) {}

  // 模块初始化时注册
  onModuleInit() {
    this.eventEmitter.on(
      'user.created',
      this.HandleUserCreatedEvent.bind(this),
    );
  }

  // 模块销毁时移除
  onModuleDestroy() {
    this.eventEmitter.off(
      'user.created',
      this.HandleUserCreatedEvent.bind(this),
    );
  }

  // 事件处理
  HandleUserCreatedEvent(event: any) {
    console.log('🥥 HandleUserCreatedEvent =>', event);
  }
}
