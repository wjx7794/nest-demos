import { Controller, Get } from '@nestjs/common';
import {
  ApiTags,
  ApiBody,
  ApiResponse,
  ApiConsumes,
  ApiOperation,
  ApiExtension,
} from '@nestjs/swagger';

@ApiTags('狗狗')
@Controller('dogs')
export class DogsController {
  @Get()
  @ApiExtension('x-foo', { hello: 'world' })
  getInfo() {
    return 2;
  }
}
