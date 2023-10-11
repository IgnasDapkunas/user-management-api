import { Get, Injectable } from '@nestjs/common';
import { Public } from './auth/constants';

@Injectable()
export class AppService {
  @Public()
  @Get()
  getHello(): string {
    return 'Hello World!';
  }
}
