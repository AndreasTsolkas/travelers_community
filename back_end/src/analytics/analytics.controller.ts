import {
    Body,
    Controller,
    Post,
    HttpCode,
    HttpStatus,
    UseGuards,
    Get,
    UseInterceptors,
    UploadedFile,
  } from '@nestjs/common';
  import { AuthGuard } from 'src/auth.guard';
  import { AnalyticsService } from 'src/analytics/analytics.service';

  
  /*@UseGuards(AuthGuard)*/
  @Controller('analytics')
  export class AnalyticsController {
    constructor(private analyticsService: AnalyticsService) {}

    @Get('/test')
    async find() {
      return await this.analyticsService.getTravelsTotalNum();
    }
  
  }
  