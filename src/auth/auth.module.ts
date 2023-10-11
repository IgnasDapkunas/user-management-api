import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
import { AuthGuard } from './auth.guard';
import { JwtStrategy } from './jwt-passport.strategy';

@Module({
  imports: [PassportModule, UsersModule, JwtModule],
  providers: [
    AuthService,
    JwtStrategy,
    {
      provide: JwtService,
      useFactory: () => {
        return new JwtService({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '60m' },
        });
      },
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
