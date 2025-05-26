import { Controller, Sse } from '@nestjs/common';
import { AppService } from './app.service';
import { interval, map } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Sse('/push')
  push() {
    // 使用 RxJS 生成数据流
    return interval(1000).pipe(
      map((i) => {
        return {
          data: { a: i },
        };
      }),
    );
  }
}
