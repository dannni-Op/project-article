import { Injectable } from '@nestjs/common';
import { AuthSignUpDto } from 'src/dto/auth-dto/auth.signup.dto';
import { User } from 'src/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { RefreshToken } from 'types/refresh-token.type';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(request: AuthSignUpDto): Promise<User> {}
  async getByUsername(username: string): Promise<User> {}
  async getById(id: number): Promise<User> {}
  async updateRefreshToken(
    id: number,
    request: RefreshToken,
  ): Promise<boolean> {
    //masih tidak pasti return boolean
  }
}
