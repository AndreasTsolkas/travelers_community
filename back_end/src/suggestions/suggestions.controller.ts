import {
    Body,
    Controller,
    Post,
    Patch,
    HttpCode,
    HttpStatus,
    UseGuards,
    Get,
    UseInterceptors,
    UploadedFile,
    Headers,
    Query,
  } from '@nestjs/common';
  import {SuggestionsService} from './suggestions.service';
  
  
  @Controller('suggestions')
  export class SuggestionsController {
    constructor(
      private readonly suggestionsService:SuggestionsService
    ) {}

    @Get('/all')
    async getAllSuggestedTravels(@Query('limit') limit: number) {
      return await this.suggestionsService.getAllSuggestedTravels(limit);
    }

    @Get('/places')
    async getAllSuggestedPlaces(@Query('limit') limit: number) {
      return await this.suggestionsService.getAllSuggestedPlaces(limit);
    }

    @Get('/countries')
    async getAllSuggestedCountries(@Query('limit') limit: number) {
      return await this.suggestionsService.getAllSuggestedCountries(limit);
    }

    @Get('/currentyear')
    async getCountriesByMostVisitsOnASpecificYear(@Query('limit') limit: number) {
      return await this.suggestionsService.getAllSuggestionsOfThisYear(limit);
    }
  
 
  }
  