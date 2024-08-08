import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Travel } from './travel.entity';
import { TravelService } from './travel.service';

@Module({
  imports: [TypeOrmModule.forFeature([Travel])],
  providers: [TravelService],
  exports: [TravelService, TypeOrmModule],
})
export class TravelModule {}
