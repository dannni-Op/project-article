import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UserDto {

  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  token?: string;
}
