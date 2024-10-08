import { Controller, Get, Post, Body } from '@nestjs/common';
import { CatsService } from './cats.service';

import { createCipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
import { createDecipheriv } from 'crypto';
import { BcryptService } from './BcryptService';

import * as bcrypt from 'bcrypt';

const iv = randomBytes(16);
const password = 'Password used to generate key';

// const sleep = (time) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(0);
//     }, time);
//   });
// };

let key, temp, hashStr;

@Controller('cats')
export class CatsController {
  constructor(
    private catsService: CatsService,
    // private bcryptService: BcryptService,
  ) {}
  @Get()
  async encode(): Promise<any> {
    key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
    const cipher = createCipheriv('aes-256-ctr', key, iv);

    const textToEncrypt = 'Nest';
    const encryptedText = Buffer.concat([
      cipher.update(textToEncrypt),
      cipher.final(),
    ]);

    temp = encryptedText;
    return encryptedText;
  }

  @Get('/decode')
  async decode(): Promise<any> {
    const decipher = createDecipheriv('aes-256-ctr', key, iv);
    const decryptedText = Buffer.concat([
      decipher.update(temp),
      decipher.final(),
    ]);
    return decryptedText.toString();
  }

  @Post('register')
  async register(@Body() user) {
    const salt = await bcrypt.genSalt();
    hashStr = await BcryptService.hash(user.password, salt);
    return hashStr;
  }

  @Post('login')
  async login(@Body() user) {
    const isMatch = await BcryptService.compare(user.password, hashStr);
    return isMatch;
  }
}
