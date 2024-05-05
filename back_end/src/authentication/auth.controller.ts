import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards, Get, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';
import { User } from 'src/user/user.entity';
import { AuthService } from 'src/authentication/auth.service';
import { NewUserDto } from 'src/dto/new.user.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
  
    @HttpCode(HttpStatus.OK)
    @Post('signin')
    signIn(@Body() signInDto: Record<string, any>) {
      return this.authService.signIn(signInDto.username, signInDto.password);
    }

    @HttpCode(HttpStatus.OK)
    @Post('register')
    @UseInterceptors(FileInterceptor('image'))
    register(@Body() newUserDto: NewUserDto, @UploadedFile() file) {
      console.log(file);
      console.log(newUserDto);
      /*return this.authService.register(file, newUserDto);*/
    }
  
  }