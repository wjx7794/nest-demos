// 内置模块
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
// 业务模块
import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. 获取装饰器
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log('requiredRoles =>', requiredRoles);
    if (requiredRoles) {
      return true;
    }

    // 2. 判断请求头里的 roles 是否匹配装饰器的 roles
    const request = context.switchToHttp().getRequest();
    const roles = request?.user?.roles || [];
    console.log('roles =>', roles);
    return roles.length > 0;
  }
}
