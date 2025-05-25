import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable, ReplaySubject } from 'rxjs';
import { toArray, map } from 'rxjs/operators';

export interface HeroById {
  id: number;
}

export interface HeroInfo {
  id: number;
  name: string;
}

interface HeroesService {
  findOne(data: HeroById): Observable<HeroInfo>;
  findMany(upstream: Observable<HeroById>): Observable<HeroInfo>;
  open(upstream: any): Observable<any>;
  write(): Observable<any>;
  close(): any;
}

@Injectable()
export class HeroClientService implements OnModuleInit {
  constructor(@Inject('HERO_PACKAGE') private readonly client: ClientGrpc) {}

  private heroesService;
  private roomStream;

  // 模块初始化
  onModuleInit() {
    this.heroesService = this.client.getService<HeroesService>('HeroesService');
    this.roomStream = new ReplaySubject();
  }

  // 使用 gRPC 服务: 一元方法，传统请求-响应通信模式
  getHero(id): Observable<HeroInfo> {
    return this.heroesService.findOne({ id });
  }

  // 使用 gRPC 服务: 双向流方法
  getMany() {
    const ids$ = new ReplaySubject();
    ids$.next({ id: 1 });
    ids$.next({ id: 2 });
    ids$.complete();

    const stream = this.heroesService.findMany(ids$.asObservable());

    // 监听完成情况
    stream.subscribe({
      next(response: Response) {
        console.log('Received response:', response);
      },
      error(err) {
        console.error('Error:', err);
      },
      complete() {
        console.log('Stream completed');
      },
    });

    return stream.pipe(toArray());
  }

  // 使用 gRPC 服务: 双向流方法(打开)
  open() {
    // 如果当前流被关闭，重新创建新的流
    if (this.roomStream.isStopped) {
      this.roomStream = new ReplaySubject();
    }

    const stream = this.heroesService.findMany(this.roomStream.asObservable());

    // 监听完成情况
    stream.subscribe({
      next(response: Response) {
        console.log('Received response:', response);
      },
      error(err) {
        console.error('Error:', err);
      },
      complete() {
        console.log('Stream completed');
      },
    });

    return stream.pipe(
      map((num) => ({
        data: { message: `${JSON.stringify(num)}` },
      })),
    );
  }

  // 使用 gRPC 服务: 双向流方法(关闭)
  close() {
    this.roomStream.complete();
    return 'room has been closed';
  }

  // 使用 gRPC 服务: 双向流方法(写入)
  write(id) {
    if (this.roomStream.isStopped) {
      return 'room has been closed, please do not write';
    }
    this.roomStream.next({ id });
    return id;
  }
}
