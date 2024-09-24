import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';

@Controller({
  path: 'cats',
  version: '2',
})
export class CatsControllerV2 {
  @Get()
  findOne() {
    return 'v2';
  }
}
