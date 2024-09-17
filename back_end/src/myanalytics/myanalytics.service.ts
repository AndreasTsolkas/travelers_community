import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
  } from '@nestjs/common';
  import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
  import {
    EntityManager,
    FindOptionsSelect,
    IsNull,
    Not,
    Repository,
    getManager,
  } from 'typeorm';
  import { databaseSchemaName } from 'src/important';
  import * as Datetime from 'src/datetime';
  import {AgeGroup} from 'src/enums/age.groups.custom.enum';
  import {UtilitiesService} from 'src/utilities.service';
  
  @Injectable()
  export class MyAnalyticsService {
    constructor(
      @InjectEntityManager()
      private readonly entityManager: EntityManager,
      private readonly utilitiesService: UtilitiesService,
    ) {}

    // Get total numbers
    async getTravelsTotalNum(userId: any) {
      return await this.utilitiesService.performQuery
      (`SELECT COUNT(*) FROM travel INNER JOIN "user" ON "travel".user_id = "user".id WHERE "user".id = $1`, [userId]);
    }
  
    async getBusinessTravelsTotalNum(userId: any) {
      return await this.utilitiesService.performQuery
      (`SELECT COUNT(*) FROM travel INNER JOIN "user" ON "travel".user_id = "user".id WHERE "user".id = $1 AND "travel".business_travel = $2`, [userId, true]);
    }
  
    async getCurrentYearTravelsTotalNum(userId: any) {
      const currentYear = Datetime.getCurrentYear();
      const startOfYear = Datetime.getStartOfTheYear(currentYear);
  
      return await this.utilitiesService.performQuery(
        `SELECT COUNT(*) FROM travel WHERE date_started >= $1 AND "travel".user_id = $2`,
        [startOfYear, userId],
      );
    }
  
    async getOngoingTravelsTotalNum(userId: any) {
      const currentYear = Datetime.getCurrentYear();
      const endOfYear = Datetime.getEndOfTheYear(currentYear);
  
      return await this.utilitiesService.performQuery(
        `SELECT COUNT(*) FROM travel WHERE date_finished >= $1 AND "travel".user_id = $2`,
        [endOfYear, userId],
      );
    }

    async getSuggestedTravelsTotalNum(userId: any) {
      return await this.utilitiesService.performQuery(
        `SELECT COUNT(*) FROM travel WHERE "travel".user_id = $1 AND "travel".suggest_it = $2`,
        [userId, true],
      );
    }



    // Get ranked data
    
    async getCountriesByExperienceRate(userId: any) {
      return await this.utilitiesService.performQuery(
        `SELECT country, SUM(experience_rate) as total_rate FROM travel WHERE "travel".user_id = $1 GROUP BY country ORDER BY total_rate DESC`,
      [userId]);
    }
  
    async getCountriesByTotalTimeSpent(userId: any) {
      return await this.utilitiesService.performQuery(
        `SELECT country, SUM(date_finished - date_started) as total_time_spent FROM travel WHERE "travel".user_id = $1 GROUP BY country ORDER BY total_time_spent DESC`,
      [userId]);
    }

    async getCountriesByMostTravelSuggestions(userId: any) {
      return await this.utilitiesService.performQuery(
        `SELECT country, COUNT(*) as total_suggestions FROM travel WHERE "travel".user_id = $1 AND suggest_it = $2 GROUP BY country ORDER BY total_suggestions DESC`,
        [userId, true],
      );
    }
  
  }
  