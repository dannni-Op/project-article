import { IsEmail, IsString, Length, Min } from 'class-validator';

export class AuthSignUpDto {
  @IsString()
  @Length(1, 255)
  username: string;

  @IsString()
  @Length(1, 255)
  password: string;

  @IsString()
  @Length(1, 255)
  name: string;
}
