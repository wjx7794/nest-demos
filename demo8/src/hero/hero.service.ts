import { Injectable } from '@nestjs/common';

@Injectable()
export class HeroService {
  // 英雄列表
  private readonly heroes = [
    { id: 1, name: 'Superman' },
    { id: 2, name: 'Batman' },
    { id: 3, name: 'Wonder Woman' },
  ];

  // 匹配英雄
  findOne(id) {
    return this.heroes.find((hero) => hero.id === id);
  }
}
