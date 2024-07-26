import { Injectable } from '@nestjs/common';
import { AuthSignInDto } from 'src/dto/auth-dto/auth.signin.dto';
import { AuthSignUpDto } from 'src/dto/auth-dto/auth.signup.dto';
import { UserRepository } from 'src/repositories/user.repository';
import { Tokens } from 'types/tokens.type';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async signIn(request: AuthSignInDto): Promise<Tokens> {
    //login
    //return tokens

    //check username
    const user = await this.userRepository.getByUsername(request.username);
  }

  async signUp(request: AuthSignUpDto): Promise<Tokens> {
    //register
    //return tokens

    //check username unique
    const user = await this.userRepository.getByUsername(request.username);

    //save user
    const result = await this.userRepository.createUser(request);
  }

  async logout(id: number): Promise<boolean> {
    //logout
    //return boolean
  }
}
