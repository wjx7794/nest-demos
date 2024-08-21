import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Get('/1.html')
  // getAll(): string {
  //   console.log('🍎1.html');
  //   return '1.html =>';
  // }
}
