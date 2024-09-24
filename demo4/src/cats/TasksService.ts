import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Interval } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  // @Cron(CronExpression.EVERY_5_SECONDS)
  // handleCron() {
  //   this.logger.debug('Called every 5 seconds');
  // }

  // @Interval(1000)
  // handleInterval() {
  //   this.logger.debug('Called every 1 seconds');
  // }

  @Interval('notifications', 1000)
  handleInterval() {
    this.logger.debug('Called every 1 seconds');
  }
}
