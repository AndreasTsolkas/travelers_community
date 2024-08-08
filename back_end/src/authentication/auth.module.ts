import { Module } from '@nestjs/common';
import { AuthService } from 'src/authentication/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from 'src/authentication/auth.controller';
import { jwtConstants } from 'src/constant';
import { UserModule } from 'src/user/user.module';
import * as Important from 'src/important';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: Important.jwtExpiresIn },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
