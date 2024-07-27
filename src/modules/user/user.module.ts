import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepository } from 'src/repositories/user.repository';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  exports: [UserRepository],
  providers: [UserRepository, UserService],
})
export class UserModule {}
