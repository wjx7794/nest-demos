import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from './photos.entity';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(Photo)
    private photosRepository: Repository<Photo>,
  ) {}

  // 1. 查询所有
  findAll(): Promise<Photo[]> {
    return this.photosRepository.find();
  }

  // 2. 新建/编辑
  async create(photo: Photo): Promise<any> {
    try {
      // 先查询是否存在
      const exist = await this.photosRepository.findOne({
        where: {
          id: photo.id,
        },
        order: {
          id: 'DESC',
        },
      });
      // 如果已存在，则为编辑
      if (exist) {
        exist.userId = photo.userId;
        exist.photoName = photo.photoName;
        await this.photosRepository.save(exist);
        return exist;
      }
      // 否则新增
      await this.photosRepository.save(photo);
      return photo;
    } catch (e) {
      console.log('🍎create 失败 => ', e);
      throw new HttpException('创建失败', HttpStatus.FORBIDDEN);
    }
  }

  // 3. 查询指定项
  async findOne(id: any): Promise<any> {
    try {
      const res = await this.photosRepository.findOne({
        where: {
          id,
        },
      });
      if (res) {
        return res;
      }
    } catch (e) {
      console.log('🍎findOne 失败 => ', e);
    }
    throw new HttpException('查询失败', HttpStatus.FORBIDDEN);
  }

  // 4. 删除
  async remove(id: string): Promise<any> {
    try {
      await this.photosRepository.delete(id);
      return '删除成功';
    } catch (e) {
      console.log('🍎remove 失败 => ', e);
    }
    throw new HttpException('删除失败', HttpStatus.FORBIDDEN);
  }
}
