import { Controller, Get, Param, Sse } from '@nestjs/common';
import { HeroClientService } from './hero-client.service';

@Controller('hero-client')
export class HeroClientController {
  constructor(private readonly heroClientService: HeroClientService) {}

  // 寻找单个英雄
  @Get('one/:id')
  async getHero(@Param('id') id: number) {
    const hero = await this.heroClientService.getHero(id);
    return hero;
  }

  // 寻找多个英雄
  @Get('many')
  getMany() {
    const heroes = this.heroClientService.getMany();
    return heroes;
  }

  // 自定义: 寻找多个英雄(输出)
  @Sse('/open')
  open() {
    return this.heroClientService.open();
  }

  // 自定义: 寻找多个英雄(输入)
  @Get('/write/:id')
  write(@Param('id') id: number) {
    return this.heroClientService.write(id);
  }

  // 自定义: 寻找多个英雄(结束)
  @Get('/close')
  close() {
    return this.heroClientService.close();
  }
}
