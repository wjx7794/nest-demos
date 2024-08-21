import {
  Controller,
  Post,
  Body,
  Get,
  // @UseFilters() 装饰器需要从 @nestjs/common 包导入
  UseFilters,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { ForbiddenException } from './filters/forbidden.exception';
import { HttpExceptionFilter } from './filters/http-exception.filter';

@Controller('cats')
// @UseFilters(HttpExceptionFilter)
export class CatsController {
  @Get()
  find() {
    return 'all of it !';
  }
  // ...
  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    throw new ForbiddenException();
  }
  @Get()
  async findAll() {
    throw new Error('error>>>');
  }
}
