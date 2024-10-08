import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsControllerV2 } from './cats.controllerV2';
import { CatsService } from './cats.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './roles.guard';
import { AuthGuard } from '../auth/auth.guard';
import { CaslModule } from '../casl/casl.module';
import { BcryptService } from './BcryptService';

@Module({
  imports: [
    CaslModule,
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
  // providers: [CatsService],
  providers: [
    CatsService,
    BcryptService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class CatsModule {}
