import { defineAbility } from '@casl/ability';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CaslAbilityFactory {
  createForUser() {
    const ability = defineAbility((can, cannot) => {
      can('manage', 'all');
      cannot('delete', 'User');
    });
    // console.log(ability.can('read', 'Post'));
    // console.log(ability.can('delete', 'User'));
    // console.log(ability.cannot('delete', 'User'));
    return ability;
  }
}
