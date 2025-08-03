import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * 1. localhost:3000/auth/login
   * 作用: 登陆生成 jwt
   * @param signInDto
   * @returns
   */
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    const { username, password } = signInDto;
    return this.authService.signIn(username, password);
  }

  /**
   * 2. localhost:3000/auth/profile
   * 作用: 查看令牌的内容/验证是否成功
   * @param signInDto
   * @returns
   */
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  /**
   * 3. localhost:3000/auth/
   * 作用: 公共方法，绕开 jwt 校验的方法
   * @param signInDto
   * @returns
   */
  @Public()
  @Get()
  findAll() {
    return [];
  }
}
