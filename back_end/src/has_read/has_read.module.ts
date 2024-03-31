import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HasRead } from 'src/has_read/has_read.entity';
import { HasReadService } from 'src/has_read/has_read.service';

@Module({
  imports: [TypeOrmModule.forFeature([HasRead])], 
  providers: [HasReadService],
  exports: [HasReadService, TypeOrmModule],
})
export class HasReadModule {}