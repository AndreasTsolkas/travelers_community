import { Module } from '@nestjs/common';
import { ListService } from 'src/lists/list.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [],
  providers: [ListService],
  exports: [ListService],
})
export class ListModule {}
