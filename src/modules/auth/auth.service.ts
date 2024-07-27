import { HttpException, Injectable } from '@nestjs/common';
import { AuthSignInDto } from 'src/dto/auth-dto/auth.signin.dto';
import { AuthSignUpDto } from 'src/dto/auth-dto/auth.signup.dto';
import { UserRepository } from 'src/repositories/user.repository';
import { Tokens } from 'types/tokens.type';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async signIn(request: AuthSignInDto): Promise<Tokens | void> {
    //login
    //return tokens

    //check username
    const user = await this.userRepository.getByUsername(request.username);
    if (!user) throw new HttpException('Username or password is wrong!', 400);

    const checkPass = await bcrypt.compare(user.password, request.password);
    if (!checkPass)
      throw new HttpException('Username or password is wrong!', 400);

    //create tokens
    return {
      access_token: 'abc',
      refresh_token: 'abc',
    };
  }

  async signUp(request: AuthSignUpDto): Promise<Tokens> {
    //register
    //return tokens

    //check username unique
    const user = await this.userRepository.getByUsername(request.username);
    if (user) throw new HttpException('Username already exist!', 400);

    //hash password
    request.password = await bcrypt.hash(request.password, 10);

    //save user
    const result = await this.userRepository.createUser(request);
    return {
      access_token: 'abc',
      refresh_token: 'abc',
    };
  }

  async logout(id: number): Promise<boolean> {
    //logout
    //return boolean
    
    await this.userRepository.updateRefreshToken(id, null);
    return true;
  }
}
