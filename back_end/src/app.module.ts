import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';

import { Book } from 'src/book/book.entity';


import { AppController } from './app.controller';
import { BookController } from 'src/book/book.controller';

import { BookModule } from 'src/book/book.module';

import { AppService } from './app.service';
import { BookService } from 'src/book/book.service';
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
      entities: [Book],
      synchronize: false,
    }),
    BookModule
  ],
  controllers: [AppController, BookController],
  providers: [AppService, BookService],
})
export class AppModule {}
