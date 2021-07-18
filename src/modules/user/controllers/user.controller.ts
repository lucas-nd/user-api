import { Body, Controller, Post } from '@nestjs/common';
import ICreateUserDTO from '../dtos/ICreateUser';
import { CreateUserService } from '../services/create-user.service';

@Controller('user')
export class UserController {
  constructor(private createUserService: CreateUserService) {}

  @Post()
  createClient(@Body() { name, email, password }: ICreateUserDTO) {
    return this.createUserService.execute({ name, email, password });
  }
}
