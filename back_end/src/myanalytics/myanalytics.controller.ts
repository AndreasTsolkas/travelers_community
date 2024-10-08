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
    Headers,
    BadRequestException
  } from '@nestjs/common';
  import { AuthGuard } from 'src/auth.guard';
  import { MyAnalyticsService } from 'src/myanalytics/myanalytics.service';
  import { UtilitiesService } from 'src/utilities.service';
  import {AgeGroup} from 'src/enums/age.groups.custom.enum';
  import * as Messages from 'src/messages';

  
  /*@UseGuards(AuthGuard)*/
  @Controller('myanalytics')
  export class MyAnalyticsController {
    constructor(private myAnalyticsService: MyAnalyticsService,
        private utilitiesService: UtilitiesService
    ) {}

    // Get total numbers
    @Get('/travelsnum')
    async getTravelsTotalNum(@Headers('Authorization') authorization: string) {
//         if (!authorization) return { message: 'Unauthorized' };
//         const userId: number = this.utilitiesService.prepareUserId(authorization);
//         if (userId === undefined) throw new BadRequestException(Messages.noGivenIdMessage
// );
        let userId=2;
        return await this.myAnalyticsService.getTravelsTotalNum(userId);
    }

    @Get('/btravelsnum')
    async getBusinessTravelsTotalNum(@Headers('Authorization') authorization: string) {
        if (!authorization) return { message: 'Unauthorized' };
        const userId: number = this.utilitiesService.prepareUserId(authorization);
        if (userId === undefined) throw new BadRequestException(Messages.noGivenIdMessage
);
        return await this.myAnalyticsService.getBusinessTravelsTotalNum(userId);
    }

    @Get('/cytravelsnum')
    async getCurrentYearTravelsTotalNum(@Headers('Authorization') authorization: string) {
        if (!authorization) return { message: 'Unauthorized' };
        const userId: number = this.utilitiesService.prepareUserId(authorization);
        if (userId === undefined) throw new BadRequestException(Messages.noGivenIdMessage
);
        return await this.myAnalyticsService.getCurrentYearTravelsTotalNum(userId);
    }

    @Get('/otravelsnum')
    async getOngoingTravelsTotalNum(@Headers('Authorization') authorization: string) {
        if (!authorization) return { message: 'Unauthorized' };
        const userId: number = this.utilitiesService.prepareUserId(authorization);
        if (userId === undefined) throw new BadRequestException(Messages.noGivenIdMessage
);
        return await this.myAnalyticsService.getOngoingTravelsTotalNum(userId);
    }

    @Get('/stravelsnum')
    async getSuggestedTravelsTotalNum(@Headers('Authorization') authorization: string) {
        if (!authorization) return { message: 'Unauthorized' };
        const userId: number = this.utilitiesService.prepareUserId(authorization);
        if (userId === undefined) throw new BadRequestException(Messages.noGivenIdMessage
);
        return await this.myAnalyticsService.getSuggestedTravelsTotalNum(userId);
    }



    // Get ranked data
    
    @Get('/countriesbyexprate')
    async getCountriesByExperienceRate(@Headers('Authorization') authorization: string) {
        if (!authorization) return { message: 'Unauthorized' };
        const userId: number = this.utilitiesService.prepareUserId(authorization);
        if (userId === undefined) throw new BadRequestException(Messages.noGivenIdMessage
);
        return await this.myAnalyticsService.getCountriesByExperienceRate(userId);
    }

    @Get('/countriesbytimespent')
    async getCountriesByTotalTimeSpent(@Headers('Authorization') authorization: string) {
        if (!authorization) return { message: 'Unauthorized' };
        const userId: number = this.utilitiesService.prepareUserId(authorization);
        if (userId === undefined) throw new BadRequestException(Messages.noGivenIdMessage
);
        return await this.myAnalyticsService.getCountriesByTotalTimeSpent(userId);
    }

    @Get('/countriesbysuggestions')
    async getCountriesByMostTravelSuggestions(@Headers('Authorization') authorization: string) {
        if (!authorization) return { message: 'Unauthorized' };
        const userId: number = this.utilitiesService.prepareUserId(authorization);
        if (userId === undefined) throw new BadRequestException(Messages.noGivenIdMessage
);
        return await this.myAnalyticsService.getCountriesByMostTravelSuggestions(userId);
    }
  
  }
  