import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';

import { User } from 'src/user/user.entity';
import { Travel } from 'src/travel/travel.entity';

import { AppController } from './app.controller';
import { UserController } from 'src/user/user.controller';
import { AuthController } from 'src/authentication/auth.controller';
import { ProfileController } from 'src/profile/profile.controller';
import { TravelController } from 'src/travel/travel.controller';
import { ListController } from 'src/lists/list.controller';

import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/authentication/auth.module';
import { ProfileModule } from 'src/profile/profile.module';
import { TravelModule } from 'src/travel/travel.module';
import { ListModule } from 'src/lists/list.module';

import { AppService } from './app.service';
import { UserService } from 'src/user/user.service';
import { AuthService } from 'src/authentication/auth.service';
import { ProfileService } from 'src/profile/profile.service';
import { TokenService } from 'src/token.service';
import { FileService } from 'src/file/file.service';
import { TravelService } from 'src/travel/travel.service';
import { ListService } from 'src/lists/list.service';

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
      entities: [User, Travel],
      synchronize: false,
    }),
    UserModule,
    AuthModule,
    ProfileModule,
    TravelModule,
    ListModule,
  ],
  controllers: [
    AppController,
    UserController,
    AuthController,
    ProfileController,
    TravelController,
    ListController,
  ],
  providers: [
    AppService,
    UserService,
    AuthService,
    ProfileService,
    TokenService,
    FileService,
    TravelService,
    ListService,
  ],
})
export class AppModule {}
