import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { UserModule } from 'src/user/user.module';
import { FileModule } from 'src/file/file.module';
import { UserService } from 'src/user/user.service';
import { ProfileService } from './profile.service';

@Module({
  imports: [UserModule, FileModule, TypeOrmModule.forFeature([User])], 
  providers: [ProfileService],
  exports: [ProfileService, TypeOrmModule],
})
export class ProfileModule {}