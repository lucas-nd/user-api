import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bcrypt } from 'src/shared/providers/implements/bcrypt';
import { Repository } from 'typeorm';
import ICreateUserDTO from '../dtos/ICreateUser';
import { User } from '../entities/user';

@Injectable()
export class CreateUserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @Inject(Bcrypt) private encrypter: Bcrypt,
  ) {}

  async execute({ name, email, password }: ICreateUserDTO) {
    const userExists = await this.userRepository.findOne({ where: { email } });

    if (userExists) {
      throw new HttpException(
        'This email already in use.',
        HttpStatus.CONFLICT,
      );
    }

    const passwordEncrypted = await this.encrypter.generateHash(password);

    const user = this.userRepository.create({
      name,
      email,
      password: passwordEncrypted,
    });
    await this.userRepository.save(user);
    return user;
  }
}
