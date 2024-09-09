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
  import {databaseSchemaName} from 'src/important';
  
  @Injectable()
  export class AnalyticsService {
    constructor(
      @InjectEntityManager()
      private readonly entityManager: EntityManager,
    ) {}


    async performQuery(query: string, parameters?:any[]) {
        let response = await this.entityManager.query(`SHOW search_path`);
        if(response.search_path!==databaseSchemaName) {
            await this.entityManager.query(`SET search_path TO ${databaseSchemaName};`);
        }
        return await this.entityManager.query(query, parameters);
    }


    // Get total numbers

    async getTravelsTotalNum() {
      return await this.performQuery(`SELECT COUNT(*) FROM travel`);
    }

    async getBusinessTravelsTotalNum() {
      return await this.performQuery(`SELECT COUNT(*) FROM travel WHERE business_travel=$1`,[true]);
    }

    async getCurrentYearTravelsTotalNum() {
      const currentYear = new Date().getFullYear();
      const startOfYear = `${currentYear}-01-01 00:00:00`;
    
      return await this.performQuery(
        `SELECT COUNT(*) FROM travel WHERE date_started >= $1`,
        [startOfYear]
      );
    }

    async getOngoingTravelsTotalNum() {
      const currentYear = new Date().getFullYear();
      const endOfYear = `${currentYear}-12-31 23:59:59`;
    
      return await this.performQuery(
        `SELECT COUNT(*) FROM travel WHERE date_finished >= $1`,
        [endOfYear]
      );
    }

    async getUsersTotalNum() {
      return await this.performQuery(`SELECT COUNT(*) FROM "user"`);
    }


    // Get ranked data

    async getCountriesByMostVisits() {
      return await this.performQuery(`SELECT country, COUNT(*) as visits FROM travel GROUP BY country ORDER BY visits DESC`);
    }

    async getCountriesByMostVisitsBySex(sex: string) {
      return await this.performQuery(
        `SELECT travel.country, COUNT(*) as visits 
         FROM travel 
         INNER JOIN "user" ON travel.user_id = "user".id
         WHERE "user".sex = $1
         GROUP BY travel.country 
         ORDER BY visits DESC`,
        [sex]
      );
    }

    async getCountriesByExperienceRate() {
      return await this.performQuery(`SELECT country, SUM(experience_rate) as total_rate FROM travel GROUP BY country ORDER BY total_rate DESC`);
    }

    async getCountriesByTotalTimeSpent() {
      return await this.performQuery(`SELECT country, SUM(date_finished - date_started) as total_time_spent FROM travel GROUP BY country ORDER BY total_time_spent DESC`);
    }

    async getCountriesByMostTravelSuggestions() {
      return await this.performQuery(`SELECT country, COUNT(*) as total_suggestions FROM travel WHERE suggest_it = $1 GROUP BY country ORDER BY total_suggestions DESC`, [true]);
    }




  
  }
  