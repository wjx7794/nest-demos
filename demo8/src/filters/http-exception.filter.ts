// src/filters/http-exception.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Inject } from '@nestjs/common';
import { Logger } from 'winston';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;

    // 记录异常信息
    this.logger.error(`Exception: ${exception.message}`, {
      stack: exception.stack,
      context: 'HttpExceptionFilter',
    });
    console.log('🔥 =>', request.headers['x-csrf-token']);

    console.log('🔥 =>', request.headers.cookie);
    response.status(status).json({
      statusCode: status,
      timestamp: new Date(),
      path: request.url,
      message: exception.message || 'Internal server error',
    });
  }
}
