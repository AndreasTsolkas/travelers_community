import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';
import { User } from 'src/user/user.entity';
import { AuthService } from 'src/authentication/auth.service';
import { NewUserDto } from 'src/dto/new.user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/signin')
  async signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/register')
  async register(@Body() newUserDto: NewUserDto) {
    console.log(newUserDto);
    return await this.authService.register(newUserDto);
  }
}
