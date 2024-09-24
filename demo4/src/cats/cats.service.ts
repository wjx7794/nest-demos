import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, catchError } from 'rxjs';
@Injectable()
export class CatsService {
  constructor(private readonly httpService: HttpService) {}

  async findAll(): Promise<any> {
    return this.httpService.get('http://localhost:3000/cats/all').pipe(
      map((res) => res.data),
      catchError((e) => {
        throw new HttpException(`请求错误`, 400);
      }),
    );
  }
}
