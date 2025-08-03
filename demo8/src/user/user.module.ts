import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UserService } from './user.service';
import { UserListener } from './UserListener';
import { UserController } from './user.controller';
import { AnalyticsService } from './AnalyticsService';

@Module({
  controllers: [UserController],
  imports: [
    EventEmitterModule.forRoot({
      // 是否使用通配符事件 (如 user.*)
      wildcard: true,
      // 命名空间分隔符
      delimiter: '.',
      // 当添加新监听器时发出 newListener 事件
      newListener: false,
      // 当移除监听器时发出 removeListener 事件
      removeListener: false,
      // 每个事件的最大监听器数量
      maxListeners: 10,
      // 在超过 maxListeners 时打印内存泄漏警告
      verboseMemoryLeak: false,
      // 是否忽略监听器中的错误
      ignoreErrors: false,
    }),
  ],
  providers: [UserService, UserListener, AnalyticsService],
})
export class UserModule {}
