import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsControllerV2 } from './cats.controllerV2';
import { CatsService } from './cats.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        timeout: configService.get('HTTP_TIMEOUT'),
        maxRedirects: configService.get('HTTP_MAX_REDIRECTS'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [CatsController, CatsControllerV2],
  providers: [CatsService],
})
export class CatsModule {}
