import {
  IsString,
  Length,
  IsNumber,
  IsEmail,
  IsOptional,
} from 'class-validator';

export class UserUpdateDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsString()
  @IsOptional()
  @Length(1, 255)
  username?: string;

  @IsString()
  @IsOptional()
  @Length(1, 255)
  password?: string;

  @IsString()
  @IsOptional()
  @Length(1, 255)
  name?: string;

  @IsEmail()
  @IsOptional()
  @Length(1, 255)
  email?: string;
}
