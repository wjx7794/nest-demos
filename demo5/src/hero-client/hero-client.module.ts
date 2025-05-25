import { Module } from '@nestjs/common';
import { HeroClientService } from './hero-client.service';
import { HeroClientController } from './hero-client.controller';
import { ClientsModule } from '@nestjs/microservices';
import { grpcClientOptions } from '../grpc-client.options';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'HERO_PACKAGE',
        ...grpcClientOptions,
      },
    ]),
  ],
  providers: [HeroClientService],
  controllers: [HeroClientController],
})
export class HeroClientModule {}
