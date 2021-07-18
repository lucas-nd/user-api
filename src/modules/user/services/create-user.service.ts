import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import ICreateUserDTO from '../dtos/ICreateUser';
import { User } from '../entities/user';

@Injectable()
export class CreateUserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async execute({ name, email, password }: ICreateUserDTO) {
    const userExists = await this.userRepository.findOne({ where: { email } });

    if (userExists) {
      throw new HttpException(
        'This email already in use.',
        HttpStatus.CONFLICT,
      );
    }

    const user = this.userRepository.create({ name, email, password });
    await this.userRepository.save(user);
    return user;
  }
}
