import { IsNotEmpty, IsString } from 'class-validator';

export class deleteUserDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}
