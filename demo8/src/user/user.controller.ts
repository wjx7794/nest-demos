import { Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  createUser() {
    // 假设用户 ID 是 1
    this.userService.createUser(1);
    return { message: 'User created' };
  }
}
