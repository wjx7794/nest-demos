import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  // imports: [CacheModule.register()],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
