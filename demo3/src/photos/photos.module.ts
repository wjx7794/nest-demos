import { Module } from '@nestjs/common';
import { PhotosController } from './photos.controller';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './photos.entity';
import { PhotosService } from './photos.service';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Photo])],
  providers: [PhotosService],
  controllers: [PhotosController],
})
export class PhotosModule {}
