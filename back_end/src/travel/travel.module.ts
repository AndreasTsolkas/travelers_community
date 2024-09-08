import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Travel } from './travel.entity';
import { TravelService } from './travel.service';
import { TravelController} from './travel.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Travel])],
  providers: [TravelService],
  controllers: [TravelController],
  exports: [TravelService, TypeOrmModule],
})
export class TravelModule {}
