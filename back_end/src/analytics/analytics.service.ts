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
  
  @Injectable()
  export class AnalyticsService {
    constructor(
      @InjectEntityManager()
      private readonly entityManager: EntityManager,
    ) {}


    async performQuery(query: string, parameters?:string[]) {
        const response = await this.entityManager.query(`SHOW search_path`);
        console.log(response);
        return await this.entityManager.query(query, parameters);
    }

    async test() {
        return await this.performQuery(`SELECT COUNT(*) FROM travel`);
    }

    async getTravelsTotalNum() {
      return await this.performQuery(`SELECT COUNT(*) FROM travel`);
    }

    async getBusinessTravelsTotalNum() {
      return await this.performQuery(`SELECT COUNT(*) FROM travel WHERE business_travel=true`);
    }

    async getCurrentYearTravelsTotalNum() {
      let currentYear = new Date();
      return await this.performQuery(`SELECT COUNT(*) FROM travel WHERE business_travel=true`);
    }

    async getUsersTotalNum() {
      return await this.performQuery(`SELECT COUNT(*) FROM "user"`);
    }
  
  }
  