import { Module } from '@nestjs/common';
import { ListService } from 'src/lists/list.service';
import { ListController} from './list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [],
  providers: [ListService],
  controllers: [ListController],
  exports: [ListService],
})
export class ListModule {}
