import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  accumulate(data) {
    return (data || []).reduce((a, b) => a + b);
  }
  createUser(data) {
    console.log('user =>', data);
  }
}
