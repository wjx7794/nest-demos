// src/sse/sse.controller.ts
import { Controller, Post, Body, Sse, Param } from '@nestjs/common';
import { SseService } from './sse.service';
import { v4 as uuidv4 } from 'uuid';

@Controller('sse')
export class SseController {
  constructor(private readonly sseService: SseService) {}

  // 步骤1: 客户端 POST 请求创建会话
  @Post('start')
  startSession(@Body() body: { userId: string }) {
    const sessionId = uuidv4(); // 生成唯一会话 ID
    return {
      sessionId,
      url: `/sse/stream/${sessionId}`, // 返回 SSE 连接地址
    };
  }

  // 步骤2: 客户端连接 SSE 流
  @Sse('stream/:sessionId')
  sseStream(@Param('sessionId') sessionId: string) {
    return this.sseService.createSession(sessionId);
  }

  // 步骤3: 向指定会话发送数据 (模拟业务触发)
  @Post('send')
  sendData(@Body() body: { sessionId: string; message: string }) {
    this.sseService.sendMessage(body.sessionId, {
      type: 'message',
      content: body.message,
    });
    return { status: 'sent' };
  }
}
