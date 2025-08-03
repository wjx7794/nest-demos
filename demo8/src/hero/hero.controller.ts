import { Controller } from '@nestjs/common';
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { HeroService } from './hero.service';
import { Subject } from 'rxjs';

@Controller('hero')
export class HeroController {
  constructor(private readonly heroService: HeroService) {}

  // 提供 grpc 服务: 一元方法
  @GrpcMethod('HeroesService', 'FindOne')
  findOne(data) {
    return this.heroService.findOne(data.id);
  }

  // 提供 grpc 服务: 双向流方法
  @GrpcStreamMethod('HeroesService')
  findMany(data$) {
    const hero$ = new Subject();

    // 处理任务
    const onNext = (req) => {
      const item = this.heroService.findOne(req.id);
      hero$.next(item);
    };

    // 完成流式调用
    const onComplete = () => hero$.complete();

    data$.subscribe({
      next: onNext,
      complete: onComplete,
    });

    return hero$.asObservable();
  }
}
