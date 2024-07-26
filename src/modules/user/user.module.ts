import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepository } from 'src/repositories/user.repository';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  exports: [],
  providers: [UserRepository, UserService],
})
export class UserModule {}
