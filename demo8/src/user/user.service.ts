import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserCreatedEvent } from './UserCreatedEvent';

@Injectable()
export class UserService {
  // 要分派一个事件，使用标准构造函数注入 EventEmitter2
  constructor(private eventEmitter: EventEmitter2) {}

  createUser(userId: number) {
    this.eventEmitter.emit('user.created', new UserCreatedEvent(userId));
  }
}
