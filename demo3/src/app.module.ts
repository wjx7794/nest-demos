import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// app
import { AppController } from './app.controller';
import { AppService } from './app.service';
// users
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
// photos
import { PhotosModule } from './photos/photos.module';
import { Photo } from './photos/photos.entity';

@Module({
  imports: [
    UsersModule,
    PhotosModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'nest_users',
      // 自动载入实体
      autoLoadEntities: true,
      // entities: [User, Photo],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
