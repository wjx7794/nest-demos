import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from './redis/redis.module';
import { MqttModule } from './mqtt/mqtt.module';
import { NatsModule } from './nats/nats.module';
import { RmqModule } from './rmq/rmq.module';
import { KafkaModule } from './kafka/kafka.module';
import { HeroModule } from './hero/hero.module';
import { HeroClientModule } from './hero-client/hero-client.module';

@Module({
  imports: [KafkaModule, HeroModule, HeroClientModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
