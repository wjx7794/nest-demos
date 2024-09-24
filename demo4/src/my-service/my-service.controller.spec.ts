import { Test, TestingModule } from '@nestjs/testing';
import { MyServiceController } from './my-service.controller';

describe('MyServiceController', () => {
  let controller: MyServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MyServiceController],
    }).compile();

    controller = module.get<MyServiceController>(MyServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
