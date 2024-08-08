import { Module } from '@nestjs/common';
import { FileService } from 'src/file/file.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
