import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';

import { Book } from 'src/book/book.entity';
import { User } from 'src/user/user.entity';
import { HasRead } from 'src/has_read/has_read.entity';

import { AppController } from './app.controller';
import { BookController } from 'src/book/book.controller';
import { UserController } from 'src/user/user.controller';
import { HasReadController } from 'src/has_read/has_read.controller';
import { AuthController } from 'src/authentication/auth.controller';
import { ProfileController } from 'src/profile/profile.controller';

import { BookModule } from 'src/book/book.module';
import { UserModule } from 'src/user/user.module';
import { HasReadModule } from 'src/has_read/has_read.module';
import { AuthModule } from 'src/authentication/auth.module';

import { AppService } from './app.service';
import { BookService } from 'src/book/book.service';
import { UserService } from 'src/user/user.service';
import { HasReadService } from 'src/has_read/has_read.service';
import { AuthService } from 'src/authentication/auth.service';
import { ProfileService } from 'src/profile/profile.service';
import { TokenService } from 'src/token.service';

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
      entities: [Book, User, HasRead],
      synchronize: false,
    }),
    BookModule, UserModule, HasReadModule, AuthModule
  ],
  controllers: [AppController, BookController, UserController, HasReadController, AuthController, ProfileController],
  providers: [AppService, BookService, UserService, HasReadService, AuthService, ProfileService, TokenService],
})
export class AppModule {}
