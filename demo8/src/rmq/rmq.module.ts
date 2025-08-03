import { Module } from '@nestjs/common';
import { RmqController } from './rmq.controller';
import { RmqService } from './rmq.service';

@Module({
  controllers: [RmqController],
  providers: [RmqService],
})
export class RmqModule {}
