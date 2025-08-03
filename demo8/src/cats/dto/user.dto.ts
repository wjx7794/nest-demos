import { Exclude, Expose, Transform } from 'class-transformer';

class RoleEntity {
  name: string;
  age: number;
}

export class UserEntity {
  _a: string;

  id: number;
  firstName: string;
  lastName: string;

  @Exclude()
  password: string;

  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  // 返回 role.name 而不是整个 role 对象
  @Transform(({ value }) => value.name)
  role: RoleEntity;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
