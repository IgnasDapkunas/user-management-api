import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.get(email);
    const isMatch = await bcrypt.compare(password, user.password);

    if (user && isMatch) {
      const { password: _password, ...result } = user;
      return result;
    } else {
      throw new UnauthorizedException();
    }
  }

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.validateUser(email, pass);

    const payload = { sub: user.id, username: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.get(registerDto.email);

    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    return await this.usersService.create(registerDto);
  }
}
