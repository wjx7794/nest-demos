import { Test, TestingModule } from '@nestjs/testing';
import { HeroClientController } from './hero-client.controller';

describe('HeroClientController', () => {
  let controller: HeroClientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HeroClientController],
    }).compile();

    controller = module.get<HeroClientController>(HeroClientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
