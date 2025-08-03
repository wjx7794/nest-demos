import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    // 注入 JwtService
    private jwtService: JwtService,
  ) {}

  // 更新 signIn 方法来生成 JWT 令牌
  async signIn(username, pass) {
    const user = await this.usersService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.userId, username: user.username };
    return {
      // 从用户属性的子集中生成 JWT
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
