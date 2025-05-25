import { Test, TestingModule } from '@nestjs/testing';
import { HeroClientService } from './hero-client.service';

describe('HeroClientService', () => {
  let service: HeroClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HeroClientService],
    }).compile();

    service = module.get<HeroClientService>(HeroClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
