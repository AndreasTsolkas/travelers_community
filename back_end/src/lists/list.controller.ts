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
import { ListService } from 'src/lists/list.service';

@Controller('list')
export class ListController {
  constructor(private listService: ListService) {}

  @Get('/getallcountries')
  async getAllCountries() {
    return this.listService.getAllCountries();
  }

  @Get('/getallnationalities')
  async getAllNationalities() {
    return this.listService.getAllNationalities();
  }

  @Get('/getallsexes')
  async getAllSexes() {
    return this.listService.getAllSexes();
  }

  @Get('/getsuggestionsmethods')
  async getAllSuggestionMethods() {
    return this.listService.getAllSuggestionMethods();
  }
}
