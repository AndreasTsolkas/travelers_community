import { Body, Controller, Delete, Get, Param, ParseBoolPipe, Patch, Put, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';
import { HasRead } from 'src/has_read/has_read.entity';
import { HasReadService } from 'src/has_read/has_read.service';

@UseGuards(AuthGuard)
@Controller('has_read')
export class HasReadController {
  
  constructor(private hasReadService: HasReadService) {

  }
  @Get('/all')
  async findAllWithRelationships() {
    return await this.hasReadService.findAllWithRelationships();
  }

  @Get('/:id')
  async findOneWithRelationships(@Param('id') id: any) {
    return await this.hasReadService.findOneWithRelationships(id);
  }

  @Patch('/:id')
  async update(@Param('id') id: number, @Body() hasReadData: Partial<HasRead>) {
    return this.hasReadService.update(id, hasReadData);
  }

  @Put()
  async create(@Body() hasReadData: Partial<HasRead>) {
    return this.hasReadService.create(hasReadData);
  }

  @Delete('/:id')
  async remove(@Param('id') id: number) {
    return this.hasReadService.remove(id);
  }

  
}