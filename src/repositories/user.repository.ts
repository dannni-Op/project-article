import { Injectable } from '@nestjs/common';
import { AuthSignUpDto } from 'src/dto/auth-dto/auth.signup.dto';
import { User } from 'src/entities/user.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(request: AuthSignUpDto): Promise<User> {
    const ett = this.dataSource.createEntityManager();
    const userReq = ett.create(User, request);
    const user = await ett.save(userReq);
    return user;
  }
  async getByUsername(username: string): Promise<User> {
    const user = await this.findOne({
      where: {
        username,
      },
    });
    return user;
  }
  async getById(id: number): Promise<User> {
    const user = await this.findOne({
      where: {
        id,
      },
    });

    return user;
  }

  async updateRefreshToken(
    id: number,
    refreshToken: string | null,
  ): Promise<User> {
    const ett = this.dataSource.createEntityManager();
    const userEtt = ett.update(User, id, {
      refresh_token: refreshToken,
    });

    const result = await this.getById(id);
    return result;
  }
}
