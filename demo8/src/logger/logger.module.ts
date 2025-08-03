// 内置模块
import { Module } from '@nestjs/common';
import { WinstonModule as NestWinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { ConfigService } from '@nestjs/config';
import * as winstonDailyRotateFile from 'winston-daily-rotate-file';

@Module({
  imports: [
    // 异步配置 Winston 模块
    NestWinstonModule.forRootAsync({
      // 注入 ConfigService
      inject: [ConfigService],
      // 工厂函数创建配置
      useFactory: (configService: ConfigService) => {
        const isProduction = configService.get('NODE_ENV') === 'production';
        // 检查终端是否支持颜色
        const isTTY = process.stdout.isTTY;

        // 创建基本格式
        const baseFormat = winston.format.combine(
          winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
          winston.format.errors({ stack: true }),
          winston.format.splat(),
        );

        // 创建一致的颜色格式
        const coloredFormat = winston.format.combine(
          baseFormat,
          isProduction
            ? winston.format.json()
            : winston.format.printf(
                ({ timestamp, level, message, context }) => {
                  // 手动添加颜色代码
                  const levelColors = {
                    error: '\x1b[31m', // 红色
                    warn: '\x1b[33m', // 黄色
                    info: '\x1b[32m', // 绿色
                    debug: '\x1b[36m', // 青色
                  };
                  const resetColor = '\x1b[0m';
                  const color = levelColors[level] || '\x1b[0m';

                  return `[${context || 'App'}] ${timestamp} ${color} ${level.toUpperCase()} ${message} ${resetColor}`;
                },
              ),
        );

        // 创建非颜色格式（用于文件）
        const nonColoredFormat = winston.format.combine(
          baseFormat,
          winston.format.printf(({ timestamp, level, message, context }) => {
            return `${timestamp} [${context || 'App'}] ${level.toUpperCase()} ${message}`;
          }),
        );

        const _format = isTTY ? coloredFormat : nonColoredFormat;

        return {
          // 使用统一的格式基类
          format: baseFormat,
          transports: [
            // 控制台传输 - 使用颜色格式
            new winston.transports.Console({
              level: isProduction ? 'info' : 'debug',
              // 只在支持颜色的终端使用颜色
              format: _format,
            }),

            // 文件输出
            new winstonDailyRotateFile({
              // 文件名模式，可使用 % DATE%
              filename: 'logs/application-%DATE%.log',
              // 日期格式
              datePattern: 'YYYY-MM-DD',
              // 是否压缩旧文件
              zippedArchive: true,
              // 单个文件最大大小
              maxSize: '20m',
              // 最多保存的文件数或天数
              maxFiles: '30d',
              // 日志级别
              level: 'info',
              // 是否输出 JSON 格式
              json: true,
              format: _format,
            }),

            // 错误日志
            new winstonDailyRotateFile({
              // 错误日志文件名
              filename: 'logs/error-%DATE%.log',
              datePattern: 'YYYY-MM-DD',
              zippedArchive: true,
              maxSize: '20m',
              maxFiles: '30d',
              // 只记录 error 及以上级别
              level: 'error',
              // 是否输出 JSON 格式
              json: true,
              // 处理未捕获异常
              handleExceptions: true,
              // 处理未处理 Promise 拒绝
              handleRejections: true,
              format: _format,
            }),
          ],
        };
      },
    }),
  ],
  // 导出模块以便其他模块使用
  exports: [NestWinstonModule],
})
export class LoggerModule {}
