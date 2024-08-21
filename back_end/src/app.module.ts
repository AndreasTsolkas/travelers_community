import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from 'src/user/user.entity';
import { Travel } from 'src/travel/travel.entity';

import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/authentication/auth.module';
import { ProfileModule } from 'src/profile/profile.module';
import { TravelModule } from 'src/travel/travel.module';
import { ListModule } from 'src/lists/list.module';
import { AnalyticsModule } from 'src/analytics/analytics.module';

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
    AnalyticsModule
  ],
})
export class AppModule {}