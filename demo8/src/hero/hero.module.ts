import { Module } from '@nestjs/common';
import { HeroController } from './hero.controller';
import { HeroService } from './hero.service';

@Module({
  imports: [],
  controllers: [HeroController],
  providers: [HeroService],
})
export class HeroModule {}
