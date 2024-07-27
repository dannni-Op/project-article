import { ForbiddenException, HttpException, Injectable } from '@nestjs/common';
import { AuthSignInDto } from 'src/dto/auth-dto/auth.signin.dto';
import { AuthSignUpDto } from 'src/dto/auth-dto/auth.signup.dto';
import { UserRepository } from 'src/repositories/user.repository';
import { Tokens } from 'types/tokens.type';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from 'types/jwt-payload.type';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signIn(request: AuthSignInDto): Promise<Tokens | void> {
    //login
    //return tokens

    //check username
    const user = await this.userRepository.getByUsername(request.username);
    if (!user) throw new HttpException('Username or password is wrong!', 400);

    const checkPass = await bcrypt.compare(request.password, user.password);
    if (!checkPass)
      throw new HttpException('Username or password is wrong!', 400);

    //generate tokens and save
    const tokens = await this.generateTokens(user.id, user.username);
    await this.updateRefreshTokenHash(user.id, tokens.refresh_token);

    return tokens;
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

    //generate tokens and save
    const tokens = await this.generateTokens(result.id, result.username);
    await this.updateRefreshTokenHash(result.id, tokens.refresh_token);

    return tokens;
  }

  async logout(id: number): Promise<boolean> {
    //logout
    //return boolean
    const user = await this.userRepository.getById(id);
    if (!user.refresh_token) throw new HttpException('Unauthorize', 400);

    await this.userRepository.updateRefreshToken(id, null);
    return true;
  }

  async updateRefreshTokenHash(id: number, token: string) {
    const hashToken = await bcrypt.hash(token, 10);
    const result = await this.userRepository.updateRefreshToken(id, hashToken);
  }

  async refreshTokens(id: number, token: string): Promise<Tokens> {
    const user = await this.userRepository.getById(id);
    if (!user || !user.refresh_token)
      throw new ForbiddenException('Access denied!');

    const rtMatches = await bcrypt.compare(token, user.refresh_token);
    if (!rtMatches) throw new ForbiddenException('Access denied!');

    const tokens = await this.generateTokens(id, user.username);
    await this.updateRefreshTokenHash(id, tokens.refresh_token);
    return tokens;
  }

  async generateTokens(id: number, username: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: id,
      username,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get('AT_SECRET'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get('RT_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
