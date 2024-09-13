import {
  Body,
  Controller,
  Post,
  Patch,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  UseInterceptors,
  UploadedFile,
  Headers,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';
import { User } from 'src/user/user.entity';
import { AuthService } from 'src/authentication/auth.service';
import { NewUserDto } from 'src/dto/new.user.dto';
import { UtilitiesService } from 'src/utilities.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService,
    private utilitiesService: UtilitiesService
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('/signin')
  async signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/register')
  async register(@Body() newUserDto: NewUserDto) {
    return await this.authService.register(newUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Patch('/signout')
  async signOut(@Headers('Authorization') authorization: string) {
    console.log(authorization);
    let userId: number = this.utilitiesService.prepareUserId(authorization);
    return await this.authService.signOut(userId);
  }
}
