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
  import {AgeGroup} from 'src/enums/age.groups.custom.enum';

  
  /*@UseGuards(AuthGuard)*/
  @Controller('analytics')
  export class AnalyticsController {
    constructor(private analyticsService: AnalyticsService) {}

    @Get('/travelsnum')
    async getTravelsTotalNum() {
        return await this.analyticsService.getTravelsTotalNum();
    }

    @Get('/btravelsnum')
    async getBusinessTravelsTotalNum() {
        return await this.analyticsService.getBusinessTravelsTotalNum();
    }

    @Get('/cytravelsnum')
    async getCurrentYearTravelsTotalNum() {
        return await this.analyticsService.getCurrentYearTravelsTotalNum();
    }

    @Get('/ogtravelsnum')
    async getOngoingTravelsTotalNum() {
        return await this.analyticsService.getOngoingTravelsTotalNum();
    }

    @Get('/usersnum')
    async getUsersTotalNum() {
        return await this.analyticsService.getUsersTotalNum();
    }

    // Get ranked data

    @Get('/countriesbyvisits')
    async getCountriesByMostVisits() {
        return await this.analyticsService.getCountriesByMostVisits();
    }

    @Get('/countriesbyvisitsbysex')
    async getCountriesByMostVisitsBySex(@Body('sex') sex: string) {
        return await this.analyticsService.getCountriesByMostVisitsBySex(sex);
    }

    @Get('/countriesbyexprate')
    async getCountriesByExperienceRate() {
        return await this.analyticsService.getCountriesByExperienceRate();
    }

    @Get('/countriesbytimespent')
    async getCountriesByTotalTimeSpent() {
        return await this.analyticsService.getCountriesByTotalTimeSpent();
    }

    @Get('/countriesbysuggestions')
    async getCountriesByMostTravelSuggestions() {
        return await this.analyticsService.getCountriesByMostTravelSuggestions();
    }

    @Get('/usrnationalitiesbytravels')
    async getUserNationalitiesByMostTravels() {
        return await this.getUserNationalitiesByMostTravels();
    }

    @Get('/usrsexesbytravels')
    async getUserSexesByMostTravels() {
        return await this.analyticsService.getUserSexesByMostTravels();
    }

    @Get('/usrbytravels')
    async getUsersByMostTravels() {
        return await this.analyticsService.getUsersByMostTravels();
    }

    @Get('/usrbysuccessfultravels')
    async getUsersByMostSuccessfulTravels() {
        return await this.analyticsService.getUsersByMostSuccessfulTravels();
    }

    @Get('/usrbybusinesstravels')
    async getUsersByMostBusinessTravels() {
        return await this.analyticsService.getUsersByMostBusinessTravels();
    }

    @Get('/usrbymostcountriesvisited')
    async getUsersByMostCountriesVisited() {
        return await this.analyticsService.getUsersByMostCountriesVisited();
    }

    @Post('/usrbymostcountriesvisited')
    async getCountriesByMostVisitsOnASpecificYear(@Body('year') year: any) {
        return await this.analyticsService.getCountriesByMostVisitsOnASpecificYear(year);
    }

    @Post('/countriesbyvisitsbynationality')
    async getCountriesByMostVisitsOnASpecificNationality(@Body('nationality') nationality: any) {
        return await this.analyticsService.getCountriesByMostVisitsOnASpecificNationality(nationality);
    }

    @Get('/countriesbyvisitsbynationality')
    async getTravelsNumForAllAgeGroups() {
        return await this.analyticsService.getTravelsNumForAllAgeGroups();
    }

    @Get('/onlineusersnum')
    async getOnlineNowUsersNum() {
        return await this.analyticsService.getOnlineNowUsersNum();
    }

    @Get('/onlineusers')
    async getOnlineNowUsers() {
        return await this.analyticsService.getOnlineNowUsers();
    }
  
  }
  