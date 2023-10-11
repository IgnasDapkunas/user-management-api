import { IsEmail, IsNumber, IsString, MinLength } from 'class-validator';

export class BaseUserDto {
  @IsNumber()
  id: number;

  @IsString()
  @MinLength(4)
  username: string;

  @IsEmail()
  email: string;
}

export class UserDto extends BaseUserDto {
  @IsString()
  @MinLength(6)
  password: string;
}
