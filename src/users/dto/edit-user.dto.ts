import { IsNotEmpty, IsString } from 'class-validator';

export class EditUserDto {
  @IsNotEmpty()
  @IsString()
  id: string;
  email: string;
  username: string;
  password: string;
}
