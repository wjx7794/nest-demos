import { Controller, Get, Post, Req, Res, Delete } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('cookies')
export class CatsController {
  // 1. 读取 Cookie
  @Get()
  getCookie(@Req() request: Request) {
    // 没有签名的 cookie 值从请求的 cookies 获取
    // 签名的 cookie 值从请求的 signedCookies 里获取
    const cookieValue = request.signedCookies;
    return cookieValue;
  }

  // 2. 设置 Cookie
  @Post()
  setCookie(@Res() response: Response) {
    response.cookie('csrf-token', 'your-secret-key', {
      // 禁止 JavaScript 访问
      httpOnly: true,
      // 仅通过 HTTPS 传输
      secure: false,
      // CSRF 保护（'strict' / 'lax' / 'none')
      sameSite: 'lax',
      // 设为 true 即对该 cookie 签名
      signed: true,
      // Cookie 有效期（毫秒）
      maxAge: 1000 * 60 * 60,
      // Cookie 作用域名
      domain: 'localhost',
      // Cookie 作用路径
      path: '/',
    });
    response.send('Cookie has been set');
  }

  // 3. 删除 Cookie
  @Delete()
  deleteCookie(@Res() response: Response) {
    response.clearCookie('name');
    // 或者设置 cookie 的 maxAge 为 0
    // response.cookie('name', '', { maxAge: 0 });
    response.send('Cookie has been deleted');
  }
}
