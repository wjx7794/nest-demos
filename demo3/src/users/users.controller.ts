import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // GET => http://localhost:3000/users
  @Get()
  findAll(): any {
    return this.usersService.findAll();
  }

  // POST => http://localhost:3000/users/?id=1&firstName=Jack&lastName=Wang
  @Post()
  create(@Body() user: User): any {
    return this.usersService.create(user);
  }

  // GET => http://localhost:3000/users/1
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  // GET => http://localhost:3000/users/delete/2
  @Get('/delete/:id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
