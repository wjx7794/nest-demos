// src/sse/sse.service.ts
import { Injectable } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class SseService {
  // 存储每个会话的 SSE 流
  private sessions = new Map<string, any>();

  // 创建新的 SSE 流
  createSession(sessionId: string): Observable<MessageEvent> {
    const subject = new Subject<MessageEvent>();
    this.sessions.set(sessionId, subject);
    return subject.asObservable();
  }

  // 向指定会话推送消息
  sendMessage(sessionId: string, data: any) {
    const subject = this.sessions.get(sessionId);
    if (subject) {
      subject.next({ data: JSON.stringify(data) });
    }
  }

  // 关闭会话
  closeSession(sessionId: string) {
    const subject = this.sessions.get(sessionId);
    if (subject) {
      subject.complete();
      this.sessions.delete(sessionId);
    }
  }
}
