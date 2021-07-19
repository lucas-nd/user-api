import { Injectable } from '@nestjs/common';
import { Encrypter } from '../interfaces/encrypter.interface';
import { compare, hash } from 'bcryptjs';

@Injectable()
export class Bcrypt implements Encrypter {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }
  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}
