import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './auth.guard';

/*@UseGuards(AuthGuard)*/
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/gethello')
  getHello(): string {
    return this.appService.getHello();
  }
}
