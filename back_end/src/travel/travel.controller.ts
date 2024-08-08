import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Travel } from './travel.entity';
import { TravelService } from './travel.service';
import { AuthGuard } from 'src/auth.guard';

/*@UseGuards(AuthGuard)*/
@Controller('travel')
export class TravelController {
  constructor(private travelService: TravelService) {}

  @Get('/all')
  async findAll() {
    return await this.travelService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: any) {
    return await this.travelService.findOne(id);
  }

  @Patch('/:id')
  async update(@Param('id') id: number, @Body() travelData: Partial<Travel>) {
    return this.travelService.update(id, travelData);
  }

  @Put()
  async create(@Body() travelData: Partial<Travel>) {
    return this.travelService.create(travelData);
  }

  @Delete('/:id')
  async remove(@Param('id') id: number) {
    return this.travelService.remove(id);
  }
}
