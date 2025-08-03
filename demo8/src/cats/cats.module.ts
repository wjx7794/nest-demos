// 内置模块
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
// 业务模块
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { RolesGuard } from './roles.guard';
import { AuthGuard } from './auth.guard';
import { CaslModule } from '../casl/casl.module';

@Module({
  imports: [CaslModule],
  controllers: [CatsController],
  providers: [
    CatsService,
    // 先 Auth
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
    // 再 Roles
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
  ],
})
export class CatsModule {}
