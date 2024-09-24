import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class UserService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  private USRE_KEY = 'user_key:';

  async create(createUserDto: CreateUserDto) {
    const cacheId = new Date().getTime();
    await this.cacheManager.set(
      this.USRE_KEY + cacheId,
      createUserDto,
      1000 * 60 * 60 * 60, // ttl必须
    );
    return {
      cacheId,
      ...createUserDto,
    };
  }

  async findAll() {
    // [ 'user_key:1725501236698' ]
    const userKeys = await this.cacheManager.store.keys(this.USRE_KEY + '*');
    const userList = [];
    console.log('userKeys =>', userKeys);
    for (const key of userKeys) {
      const user = (await this.cacheManager.get(key)) as object;
      userList.push({
        cacheId: key.split(':')[1],
        ...user,
      });
    }
    return userList;
  }

  findOne(id: number) {
    return this.cacheManager.get(this.USRE_KEY + id);
  }

  // 修改
  update(id: number, updateUserDto: UpdateUserDto) {
    return this.cacheManager.set(
      this.USRE_KEY + id,
      updateUserDto,
      1000 * 60 * 60 * 60,
    );
  }

  remove(id: number) {
    return this.cacheManager.del(this.USRE_KEY + id);
  }
}
