import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';
import { Tokens } from 'types/tokens.type';
import { AuthSignInDto } from 'src/dto/auth-dto/auth.signin.dto';
import { AuthSignUpDto } from 'src/dto/auth-dto/auth.signup.dto';
import { AuthService } from './auth.service';
import { Public } from 'src/commons/decorators/public.decorator';
import { RtGuard } from 'src/commons/guards/rt.guard';
import { User } from 'src/entities/user.entity';
import { Auth } from 'src/commons/decorators/auth.decorator';

@Controller('/api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/signin')
  async signIn(@Body() request: AuthSignInDto): Promise<Tokens | void> {
    //login
    //return tokens
    const tokens = await this.authService.signIn(request);
    return tokens;
  }

  @Public()
  @Post('/signup')
  async signUp(@Body() request: AuthSignUpDto): Promise<Tokens> {
    //register
    //return token supaya auto login
    const tokens = await this.authService.signUp(request);
    return tokens;
  }

  @Delete('/logout')
  async logout(@Auth() user: any): Promise<boolean> {
    //logout
    //return boolean

    const result: boolean = await this.authService.logout(user.sub);
    return result;
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('/refresh')
  async refreshTokens(
    @Auth('refresh_token') token: string,
    @Auth() user: any,
  ): Promise<Tokens> {
    return await this.authService.refreshTokens(user.sub, token);
  }
}
