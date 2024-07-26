import { Body, Controller, Delete, Post } from '@nestjs/common';
import { Tokens } from 'types/tokens.type';
import { AuthSignInDto } from 'src/dto/auth-dto/auth.signin.dto';
import { AuthSignUpDto } from 'src/dto/auth-dto/auth.signup.dto';
import { AuthService } from './auth.service';

@Controller('/api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  async signIn(@Body() request: AuthSignInDto): Promise<Tokens> {
    //login
    //return tokens
    const tokens = await this.authService.signIn(request);
  }

  @Post('/signup')
  async signUp(@Body() request: AuthSignUpDto): Promise<Tokens> {
    //register
    //return token supaya auto login
    const tokens = await this.authService.signUp(request);
  }

  @Delete('/logout')
  async logout(): Promise<boolean> {
    //logout
    //return boolean
    const result: boolean = await this.authService.logout(id);
    return result;
  }
}
