import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class UserListener {
  @OnEvent('user.created')
  handleUserCreatedEvent(event) {
    console.log(`=========>, ${event.userId}`);
  }
}
