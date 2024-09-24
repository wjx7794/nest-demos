import { Controller, Get } from '@nestjs/common';
import { CatsService } from './cats.service';

const sleep = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(0);
    }, time);
  });
};

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}
  @Get()
  async findAll(): Promise<any> {
    return await this.catsService.findAll();
  }

  @Get('all')
  async getAll(): Promise<any> {
    // await sleep(1500);
    return 'All Cats';
  }
}
