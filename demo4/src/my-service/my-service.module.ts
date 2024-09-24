// import { Module } from '@nestjs/common';
// import { MyServiceController } from './my-service.controller';

// @Module({
//   controllers: [MyServiceController]
// })
// export class MyServiceModule {}

import {
  Module,
  // CacheModule,
  // CACHE_MANAGER,
  Injectable,
  Inject,
} from '@nestjs/common';
import { CacheModule, CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class MyService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager) {}

  async setCache(key: string, value: any) {
    await this.cacheManager.set(key, value);
  }

  async getFromCache(key: string): Promise<any> {
    return this.cacheManager.get(key);
  }
}

@Module({
  imports: [
    CacheModule.register(), // 配置你的缓存存储方式，例如使用内存、Redis等
  ],
  providers: [MyService],
  exports: [MyService],
})
export class MyModule {}
