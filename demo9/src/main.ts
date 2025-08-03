import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 设置全局前缀 (路由请求)
  app.setGlobalPrefix('api', {
    exclude: ['/'],
  });

  // DocumentBuilder 用于构建符合 OpenAPI 规范的基础文档结构
  const config = new DocumentBuilder() // 创建一个新的 Swagger 文档构建器实例
    // 设置 API 文档的主标题
    .setTitle('Cats example')
    // 设置 API 的详细描述
    .setDescription('The cats API description')
    // 设置 API 的版本号
    .setVersion('1.0')
    // 添加分类标签（API 分组）
    .addTag('cats')
    // 添加全局前缀 (swagger 文档里请求)
    .addServer('/api/')
    .addSecurity('basic', {
      type: 'http',
      scheme: 'basic',
    })
    // 生成最终的 OpenAPI 规范对象
    .build();

  /**
   * 🍃 工厂方法 SwaggerModule.createDocument()
   * - 使用 SwaggerModule 类初始化 Swagger
   * - 作用: 专门用于在请求时生成 Swagger 文档，SwaggerModule 会自动反映所有端点
   * - 入参: 应用实例和 Swagger 配置对象
   */
  const documentFactory = () =>
    SwaggerModule.createDocument(app, config, {
      // 文档中不带前缀
      ignoreGlobalPrefix: true,
    });

  // http://127.0.0.1:3002/api
  SwaggerModule.setup('api', app, documentFactory, {
    swaggerOptions: {
      // 启用扩展可见性（关键设置）
      showExtensions: true, // 必须设置为 true
    },
  });

  // http://127.0.0.1:3002/swagger/json
  SwaggerModule.setup('swagger', app, documentFactory, {
    jsonDocumentUrl: 'swagger/json',
  });

  await app.listen(3002);
}

bootstrap();
