import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from './decorator';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 1. 获取装饰器 Public
    // const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
    //   context.getHandler(),
    //   context.getClass(),
    // ]);
    // if (isPublic) {
    //   // 💡 查看此条件
    //   return true;
    // }

    const request = context.switchToHttp().getRequest();
    request.user = { roles: ['admin'] };
    console.log('🍎request =>', request.user);
    return true;

    // 2. 校验当前请求是否携带 jwt，如果没有就返回失败，如果有就校验并设置在请求头 user 字段上
    // const request = context.switchToHttp().getRequest();
    // const token = this.extractTokenFromHeader(request);
    // if (!token) {
    //   throw new UnauthorizedException();
    // }
    // try {
    //   const payload = await this.jwtService.verifyAsync(token, {
    //     secret: jwtConstants.secret,
    //   });
    //   // 💡 在这里我们将 payload 挂载到请求对象上
    //   // 以便我们可以在路由处理器中访问它
    //   request['user'] = payload;
    // } catch {
    //   throw new UnauthorizedException();
    // }
    // return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
