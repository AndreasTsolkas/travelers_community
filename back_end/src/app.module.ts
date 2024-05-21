import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';

import { User } from 'src/user/user.entity';

import { AppController } from './app.controller';
import { UserController } from 'src/user/user.controller';
import { AuthController } from 'src/authentication/auth.controller';
import { ProfileController } from 'src/profile/profile.controller';

import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/authentication/auth.module';
import { ProfileModule } from 'src/profile/profile.module';

import { AppService } from './app.service';
import { UserService } from 'src/user/user.service';
import { AuthService } from 'src/authentication/auth.service';
import { ProfileService } from 'src/profile/profile.service';
import { TokenService } from 'src/token.service';
import { FileService } from 'src/file/file.service';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

dotenv.config();
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres', 
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [User],
      synchronize: false,
    }),
    UserModule, AuthModule, ProfileModule
  ],
  controllers: [AppController, UserController, AuthController, ProfileController],
  providers: [AppService, UserService, AuthService, ProfileService, TokenService, FileService],
})
export class AppModule {}
