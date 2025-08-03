// src/middlewares/request-id.middleware.ts
import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

// 请求 ID
const Req_Id = 'request-id';
// 响应 ID
const Res_Id = 'X-Request-ID';
// 开始时间
const StartTime = 'startTime';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    // 1. 检查客户端是否提供了请求 ID
    const requestId = (req.headers[Req_Id] as string) || uuidv4();
    // console.log(req.headers);
    // console.log('🍃 req start =>', requestId);

    // 2. 添加到请求对象
    req[Req_Id] = requestId;
    req[StartTime] = Date.now();

    // 3. 设置响应头
    res.setHeader(Res_Id, requestId);

    // 4. 记录请求开始日志
    // this.logRequest(req, requestId);

    /**
     * 5. 监听响应完成事件
     * finish 事件在响应完全发送给客户端后触发
     */
    res.on('finish', () => {
      // this.logResponse(req, res);
      // console.log('🍂 req end =>', requestId);
    });

    next();
  }

  // 请求开始-打印日志
  private logRequest(req: Request, requestId: string) {
    console.log(req.query);
    this.logger.info({
      type: 'REQUEST_START',
      timestamp: new Date().toISOString(),
      message: 'Incoming request',
      requestId,
      method: req.method,
      url: req.originalUrl,
      query: req.query,
      ip: req.ip,
      headers: {
        // 仅记录安全相关的头信息
        'user-agent': req.headers['user-agent'],
        referer: req.headers['referer'],
      },
    });
  }

  // 请求结束-打印日志
  private logResponse(req: Request, res: Response) {
    const requestId = req[Req_Id];
    const duration = this.calculateDuration(req);
    const contentLength = res.get('Content-Length') || '0';

    this.logger.info({
      type: 'REQUEST_END',
      timestamp: new Date().toISOString(),
      message: 'Response completed',
      requestId,
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      contentLength,
      duration: `${duration}ms`,
    });
  }

  //  计算请求处理时间（毫秒）
  private calculateDuration(req: Request): number {
    return Date.now() - (req[StartTime] || Date.now());
  }
}
