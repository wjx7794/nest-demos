import { Injectable } from '@nestjs/common';
import { CaslAbilityFactory } from '../casl/casl-ability.factory/casl-ability.factory';

@Injectable()
export class CatsService {
  constructor(private caslAbilityFactory: CaslAbilityFactory) {}

  async findAll(): Promise<any> {
    const ability = this.caslAbilityFactory.createForUser();
    console.log(ability.can('read', 'Post'));
    console.log(ability.can('delete', 'User'));
    console.log(ability.cannot('delete', 'User'));
    return 'all';
  }
}
