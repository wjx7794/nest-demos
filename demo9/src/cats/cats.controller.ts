import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiBody,
  ApiResponse,
  ApiConsumes,
  ApiOperation,
  ApiExtension,
  ApiSecurity,
} from '@nestjs/swagger';
import { Express } from 'express';

/**
 * 🍃 @ApiTags()
 * 作用: 将控制器内的端点分组到指定标签下
 */
@ApiTags('猫咪')
@Controller('cats')
@ApiSecurity('basic')
export class CatsController {
  @Get()
  @ApiExtension('x-foo', { hello: 'world' })
  getInfo() {
    return 1;
  }

  @Post('upload')
  /**
   * 🍃 @ApiOperation({ ... })
   * 作用: 提供端点操作的元数据
   */
  @ApiOperation({
    // 简短的描述（列表页显示）
    summary: '上传单个文件',
    // 详细描述（详情页显示）
    description: '上传一个文件到服务器',
  })
  /**
   * 🍃 @ApiConsumes('multipart/form-data')
   * - 作用: 声明端点消费的内容类型
   * - 参数: contentTypes 可接受的多媒体类型
   * - 特殊用途: 文件上传必须使用
   */
  @ApiConsumes('multipart/form-data')
  /**
   * 🍃 @ApiBody({ ... })
   * - 作用: 描述请求体的详细结构
   */
  @ApiBody({
    // 请求体描述
    description: '文件上传数据',
    // 是否必需
    required: true,
    // OpenAPI 架构定义
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          // 关键: 标记为二进制格式
          format: 'binary',
          description: '要上传的文件',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  /**
   * 🍃 @ApiResponse({ ... })
   * - 描述操作可能的响应
   */
  @ApiResponse({
    // HTTP 状态码
    status: 201,
    // 响应描述
    description: '文件上传成功',
    // 响应体结构
    schema: {
      properties: {
        filename: { type: 'string', example: 'image.jpg' },
        mimetype: { type: 'string', example: 'image/jpeg' },
        size: { type: 'number', example: 1024 },
      },
    },
  })
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      filename: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
    };
  }
}
