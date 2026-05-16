import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PASSWORD_SALT_ROUNDS } from 'src/shared';

@Injectable()
export class HashService {
  async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, PASSWORD_SALT_ROUNDS);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
