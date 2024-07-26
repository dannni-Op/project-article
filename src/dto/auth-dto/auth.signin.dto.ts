import { IsString, Length } from 'class-validator';

export class AuthSignInDto {
  @IsString()
  @Length(1, 255)
  username: string;

  @IsString()
  @Length(1, 255)
  password: string;
}
