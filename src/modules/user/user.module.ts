import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bcrypt } from 'src/shared/providers/implements/bcrypt';
import { UserController } from './controllers/user.controller';
import { User } from './entities/user';
import { CreateUserService } from './services/create-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [CreateUserService, Bcrypt],
})
export class UserModule {}
