import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // 1. 查询所有
  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  // 2. 新建/编辑
  async create(user: User): Promise<any> {
    try {
      // 先查询是否存在
      const exist = await this.usersRepository.findOne({
        where: {
          id: user.id,
        },
        order: {
          id: 'DESC',
        },
      });
      // 如果已存在，则为编辑
      if (exist) {
        exist.firstName = user.firstName;
        exist.lastName = user.lastName;
        await this.usersRepository.save(exist);
        return exist;
      }
      // 否则新增
      await this.usersRepository.save(user);
      return user;
    } catch (e) {
      console.log('🍎create 失败 => ', e);
      throw new HttpException('创建失败', HttpStatus.FORBIDDEN);
    }
  }

  // 3. 查询指定项
  async findOne(id: any): Promise<any> {
    try {
      const res = await this.usersRepository.findOne({
        // where: {
        //   id,
        // },
        select: ['id', 'photos'],
        where: {
          photos: {
            userId: id,
          },
        },
        relations: ['photos'], // 关联字段
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
      await this.usersRepository.delete(id);
      return '删除成功';
    } catch (e) {
      console.log('🍎remove 失败 => ', e);
    }
    throw new HttpException('删除失败', HttpStatus.FORBIDDEN);
  }
}
