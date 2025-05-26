import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 允许所有跨域请求 (生产环境应限制域名)
  app.enableCors({
    origin: true,
    methods: 'GET',
  });
  await app.listen(3000);
}
bootstrap();
