import { Controller, Get } from '@nestjs/common';
import { MyService } from './my-service.module';

import { UseInterceptors } from '@nestjs/common';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

@Controller('service')
@UseInterceptors(CacheInterceptor)
export class MyServiceController {
  constructor(private myService: MyService) {}

  @CacheKey('dbc')
  @CacheTTL(1000 * 60 * 60 * 60)
  @Get('/set')
  save() {
    return 'all of it !';
  }

  get() {
    return 'all of it !';
  }
}
