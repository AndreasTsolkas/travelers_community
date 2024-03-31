import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';
import { User } from 'src/user/user.entity';
import { AuthService } from 'src/authentication/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
  
    @HttpCode(HttpStatus.OK)
    @Post('signin')
    signIn(@Body() signInDto: Record<string, any>) {
      return this.authService.signIn(signInDto.email, signInDto.password);
    }

    @HttpCode(HttpStatus.OK)
    @Post('register')
    register(@Body() user: User) {
      return this.authService.register(user);
    }
  
  }